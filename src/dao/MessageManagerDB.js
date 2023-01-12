const messageModel = require("../models/message.model.js")

class MessageManager {
  constructor() {}

  getMessages = async () => {
    return await messageModel.find()
  };

  

  addMessage = async (
    user,
    message
  ) => {

    return await messageModel.create({user, message})
  };
}

module.exports = MessageManager;