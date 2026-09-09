const { processChatMessage } = require('../services/aiService');

const handleChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    const result = await processChatMessage(message, ipAddress);

    return res.status(200).json({
      success: true,
      reply: result.reply,
      data: {
        reply: result.reply,
        timestamp: result.timestamp,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleChat,
};
