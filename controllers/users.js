const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {
      const userProp = req.body;

      User.create(userProp)
          .then((User) => {
              res.status(200).send(User)
          })
          .catch((error)=> res.status(400).json(error))
        });
    },
    login: (req, res) => {
        const { name, password } = req.body;

        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
          let result = {};
          let status = 200;
          if(!err) {
            User.findOne({name}, (err, user) => {
              if (!err && user) {
                // We could compare passwords in our model instead of below
                bcrypt.compare(password, user.password).then(match => {
                  if (match) {
                    result.status = status;
                    result.result = user;
                  } else {
                    status = 401;
                    result.status = status;
                    result.error = 'Authentication error';
                  }
                  res.status(status).send(result);
                })
                .catch((error)=> res.status(400).json(error))

              } else {
                status = 404;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
              }
            });
          } else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
  }
}
