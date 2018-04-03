const db = require("../models");

// Defining methods for the articlesController
module.exports = {
  findAll: function(req, res) {
    console.log("hi I'm the findAll controller");
    db.Article
      .find({})
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => {console.log("I am the error for findAll"); res.status(422).json(err)});
  },
  findById: function(req, res) {
    console.log("hello"+req.params.id);
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  save: function(req, res) {
    console.log("hi I'm the save controller",req.body);
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {console.log("I am the error for saving"); res.status(422).json(err)});
  },
  // update: function(req, res) {
  //   db.Article
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  remove: function(req, res) {
    console.log("hi I'm the remove controller",req.params.id);
    db.Article
      .findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
