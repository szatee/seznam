module.exports = (app) => {
  const item = require("../controllers/item.controller");

  var router = require("express").Router();

  //Create a new item
  router.post("/", item.create);

  //Delete a item with id
  router.delete("/:id", item.delete);

  app.use("/api/item", router);
};
