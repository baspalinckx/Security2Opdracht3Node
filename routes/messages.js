const controller = require('../controllers/messages');
const validateToken = require('../utilis').validateToken;

module.exports = (router) => {
  router.route('/messages')
    .post(validateToken, controller.add)
    .get(controller.getAll);

  router.route('/messagesDummy')
    .post(controller.addDummyData);

};
