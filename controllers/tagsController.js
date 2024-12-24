const db = require("../db/queries");

const addTag = async (req, res) => {
  try {
    const { tagName, title } = req.body;
    if (tagName) {
      const status = await db.createTag(tagName, title);
      if (status === true) {
        res.sendStatus(200);
      } else {
        res.json(status);
      }
    } else {
      res.json({
        error: "Error cannot create tag!",
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      error: "Error occurred while adding tag! Try again!",
    });
  }
};

const getPostsByTag = async (req, res) => {
  const { tag } = req.params;
  const posts = await db.filterPostsByTag(tag);
  try {
    if (posts) {
      res.json({
        posts
      })
    }
    else {
      res.json({
        error: "Error! could not find posts"
      })
    }
  }
  catch (err) {
    res.json({
      error: "Error! occurred while retrieving posts"
    })
  }
}

const getAllTags = async (req, res) => {
  try {
    const tags = await db.getAllTags();
    if (tags) {
      res.json({
        tags: tags,
      });
    } else {
      res.json({
        error: "Error! could not find any tags!",
      });
    }
  } catch (err) {
    res.json({
      error: "Error occurred while retrieving tag data!",
    });
  }
};

module.exports = { addTag, getAllTags, getPostsByTag };
