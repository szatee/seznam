const db = require("../models");
const List = db.lists;
const Item = db.items;

// Create and Save a new List
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Create a new list
  const list = {
    name: req.body.name,
  };

  List.create(list)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating list",
      });
    });
};

exports.findAll = (req, res) => {
  List.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting list",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  List.findById(id)
    .then((list) => {
      Item.find({ listId: id })
        .then((items) => {
          res.send({ id: list.id, name: list.name, items });
        })
        .catch((error) => {
          res.status(500).send({
            message: err.message || "Some error occurred while getting list",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting list",
      });
    });
};

// Update a List by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(404)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  List.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update list with id=${id}!`,
        });
      } else res.send({ message: "List was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update list with id=" + id,
      });
    });
};

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  List.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete list with id=${id}!`,
        });
      } else res.send({ message: "List was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete list with id=" + id,
      });
    });
};

// Delete all Lists from the database.
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then((data) => {
      List.deleteMany({})
        .then((data) => {
          res.send({
            message: `${data.deletedCount} List were deleted successfully!`,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all list",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all list",
      });
    });
};
