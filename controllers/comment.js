const Comment = require('../models/comment');

exports.postComment = async (req, res, next) => {
  Comment.create(
    req.body,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result) {
        res.status(201).send("Created");
      }
      else {
        res.status(400).send("Cannot add your comment");
      }
    });
}

exports.getComments = async (req, res, next) => {
  const comments = await Comment.find({
    productId: req.query.pid,
    status: true
  },
    null, {
      sort: {'createdAt': -1},
    }).then((comments) => comments);
  res.status(200).send(comments);
}

// exports.getPhones = async (req, res, next) => {

// }