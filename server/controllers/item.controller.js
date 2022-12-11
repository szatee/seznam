const db = require("../models");
const Item = db.items;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Create a new item
  const item = {
    listId: req.body.listId,
    name: req.body.name,
  };

  Item.findOne({ name: item.name }).then((data) => {
    if (!data) {
      Item.create(item)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating item",
          });
        });
    } else {
      res.status(400).send({
        message: "Položka již existuje!",
      });
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete item with id=${id}!`,
        });
      } else res.send({ message: "item was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete item with id=" + id,
      });
    });
};
