const db = require("../db/queries");

const addTag = async (req, res) => {
  try {
    const { tagName } = req.body;
    if (tagName) {
      const status = await db.createTag(tagName);
      console.log(status);
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

module.exports = { addTag, getAllTags };
