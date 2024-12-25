const prisma = require("../db/prismaClient");
const createUser = async (username, password, email) => {
  try {
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return "success";
  } catch (err) {
    if (err.code === "P2002") {
      return `${err.meta.target[0]} already exists`;
    } else {
      return "Error occurred during Sign-Up!";
    }
  }
};

const filterPostsByTag = async (tag) => {
  try {
    const posts = await prisma.tag.findMany(
      {
        where: {
          name: tag
        },
        select: {
          postId: true
        }
      }
    );
    const postIds = posts.map(post => post.postId);
    const filteredPost = await prisma.post.findMany({
      where: {
        id: {
          in: postIds
        }
      }
    })
    return filteredPost;
  }
  catch (err) {
    console.error(err)
  }
  return false;
}

const getPost = async (title) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        title: title,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }
    const comments = await Promise.all(
      (await prisma.comment.findMany(
        {
          where:
          {
            postId: post.id
          }
        }
      )).map(async (comment) => {
        if (comment.postId === post.id) {
          const { username } = await prisma.user.findUnique({ where: { id: comment.userId } });
          const { message } = comment;
          return { message, username };
        }
        return null;
      })
    );
    const likeCount = await prisma.like.findMany(
      {
        where: {
          postId: post.id
        }
      }
    );
    const tagOnPosts = await prisma.tagOnPosts.findMany({
      where: {
        postId: post.id
      }
    })
    const tagIds = tagOnPosts.map(tagOnPost => tagOnPost.tagId);
    const tags = await prisma.tag.findMany({
      where: {
        id: { in: tagIds }
      }
    })
    return {
      success: true,
      post: {
        ...post,
        likeCount: likeCount.length,
        comments: comments,
        tags: tags,
      },
    };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error fetching post" };
  }
};

const verifyAdmin = async (username) => {
  try {
    const { role } = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (role === "ADMIN") {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const getUserCredentials = async (uname) => {
  try {
    const { username, password, role } = await prisma.user.findUnique({
      where: {
        username: uname,
      },
    });
    return { username, password, role };
  } catch (err) {
    console.error(err);
  }
};

const findUser = async (username) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (result) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const addComment = async (username, comment, postTitle) => {
  try {
    const Post = await prisma.post.findUnique({
      where: {
        title: postTitle,
      },
    });
    const User = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const result = await prisma.comment.create({
      data: {
        postId: Post.id,
        message: comment,
        userId: User.id,
      },
    });
    if (result) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const createPost = async (title, content) => {
  try {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (title, updatedTitle, updatedContent) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        title: title,
      },
    });
    const result = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: updatedTitle,
        content: updatedContent,
      },
    });
    if (result) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const deletePost = async (title) => {
  try {
    const result = await prisma.post.delete({
      where: {
        title: title,
      },
    });
    if (result) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const deleteTag = async (tagName, title) => {
  try {
    const post = await prisma.post.findUnique(
      {
        where: {
          title: title
        }
      }
    )
    const tag = await prisma.tag.findUnique({
      where: {
        name: tagName
      }
    })
    const tagOnPost = await prisma.tagOnPosts.findFirst({
      where: {
        postId: post.id,
        tagId: tag.id,
      },
    })
    const result = await prisma.tagOnPosts.delete(
      {
        where: {
          id: tagOnPost.id
        }
      }
    )
    if (result) {
      return true;
    }
  }
  catch (err) {
    console.error(err);
    return false;
  }
}

const createTag = async (tagName, title) => {
  let status = false;
  try {
    const post = await prisma.post.findUnique(
      {
        where: {
          title: title
        }
      }
    )
    const existingTag = await prisma.tag.findUnique({
      where: {
        name: tagName
      }
    })
    if (existingTag) {
      await prisma.tagOnPosts.create({
        data: {
          tagId: existingTag.id,
          postId: post.id
        }
      });
      status = true;
    }
    else {
      const tag = await prisma.tag.create({
        data: {
          name: tagName,
          postId: post.id,
        },
      });
      await prisma.tagOnPosts.create({
        data: {
          tagId: tag.id,
          postId: post.id
        }
      });
      status = true;
    }
    return status;
  } catch (err) {
    if (err.code === "P2002") {
      return { error: `${err.meta.modelName} already exists` };
    }
    console.error(err);
  }
  return status;
};

const getAllTags = async () => {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (err) {
    console.error(err);
  }
  return false;
};

const likePost = async (title, username) => {
  try {
    const post = await prisma.post.findUnique({
      where: { title },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const user = await prisma.user.findUnique(
      {
        where: {
          username: username
        }
      }
    )
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: post.id,
        userId: user.id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      return { success: true, liked: false };
    }
    await prisma.like.create({
      data: {
        postId: post.id,
        userId: user.id,
      },
    });
    return { success: true, liked: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error processing like" };
  }
};

module.exports = {
  createUser,
  findUser,
  getUserCredentials,
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  verifyAdmin,
  addComment,
  createTag,
  getAllTags,
  likePost,
  getPost,
  filterPostsByTag,
  deleteTag
};
