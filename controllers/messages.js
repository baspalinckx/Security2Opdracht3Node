const mongoose = require('mongoose');
const Message = require('../models/messages');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {
      const messageProp = req.body;

      Message.create(messageProp)
          .then((Message) => {
              res.status(200).send(Message)
          })
          .catch((error)=> res.status(400).json(error))
  });
  },
    getAll: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
          Message.find({})
            .then((Message) => {
              res.status(200).json({
                'messages' : Message
              });
            })
            .catch((error) => res.status(400).json(error))
        });
      },
    addDummyData: (req, res) => {
      mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {

        const message1 = new Message(
          { text: "Mooi platform dit",
            user: "Ernst"}
        );
        const message2 = new Message(
          { text: "Zeker en lekker veilig",
            user: "Bobby"}
        );

        Message.create(message1)
          .then((Message) => {
          })
        Message.create(message2)
          .then((Message) => {
            res.status(200).send(Message)
          })
          .catch((error)=> res.status(400).json(error))
        });
    }
  }
