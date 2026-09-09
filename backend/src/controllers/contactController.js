const contactService = require('../services/contactService');
const { sendContactNotification } = require('../services/emailService');
const { sendError } = require('../utils/response');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const ip_address = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const saved = await contactService.saveMessage({ name, email, subject, message, ip_address });

    // Asynchronously trigger email notification so it doesn't slow down the user's form submission
    sendContactNotification(saved).catch((err) => {
      console.error('[EMAIL NOTIFY TRIGGER ERROR]:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await contactService.getAllMessages();
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const getMessageById = async (req, res, next) => {
  try {
    const message = await contactService.getMessageById(req.params.id);
    if (!message) {
      return sendError(res, 'Message not found', 404);
    }
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await contactService.updateMessageStatus(req.params.id, status || 'read');
    return res.status(200).json({ success: true, id: req.params.id, status: status || 'read' });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    await contactService.deleteMessage(req.params.id);
    return res.status(200).json({ success: true, id: req.params.id, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
};
