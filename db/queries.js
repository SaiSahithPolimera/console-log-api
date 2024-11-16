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
    return "Sign-up success";
  } catch (err) {
    if (err.code === "P2002") {
      return `${err.meta.target[0]} already exists`;
    } else {
      return "Error occurred during Sign-Up!";
    }
  }
};

const getUserCredentials = async (uname) => {
  try {
    const { username, password } = await prisma.user.findUnique({
      where: {
        username: uname,
      },
    });
    return { username, password };
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

module.exports = { createUser, findUser, getUserCredentials };
