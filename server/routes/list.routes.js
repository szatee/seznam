module.exports = (app) => {
  const list = require("../controllers/list.controller");

  var router = require("express").Router();

  //Create a new List
  router.post("/", list.create);

  //Get all list
  router.get("/", list.findAll);

  //Get a single list with id
  router.get("/:id", list.findOne);

  //Update a list with id
  router.put("/:id", list.update);

  //Delete a list with id
  router.delete("/:id", list.delete);

  //Delete all list
  router.delete("/", list.deleteAll);

  app.use("/api/list", router);
};
