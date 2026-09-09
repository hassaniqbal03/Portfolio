const { query } = require('../config/db');

const DEFAULT_MESSAGES = [];

let memoryMessages = [];

const getAllMessages = async () => {
  try {
    const rows = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return rows || [];
  } catch (error) {
    console.warn('[CONTACT SERVICE] In-memory messages fallback:', error.message);
    return memoryMessages;
  }
};

const getMessageById = async (id) => {
  try {
    const rows = await query('SELECT * FROM contact_messages WHERE id = ?', [id]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return memoryMessages.find(m => m.id === Number(id)) || null;
  } catch (error) {
    return memoryMessages.find(m => m.id === Number(id)) || null;
  }
};

const saveMessage = async ({ name, email, subject, message, ip_address = '127.0.0.1' }) => {
  try {
    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message, status, ip_address)
       VALUES (?, ?, ?, ?, 'unread', ?)`,
      [name, email, subject, message, ip_address]
    );
    const newMessage = {
      id: result.insertId,
      name,
      email,
      subject,
      message,
      status: 'unread',
      ip_address,
      created_at: new Date().toISOString()
    };
    memoryMessages.unshift(newMessage);
    return newMessage;
  } catch (error) {
    console.warn('[CONTACT SERVICE] Create message fallback:', error.message);
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      status: 'unread',
      ip_address,
      created_at: new Date().toISOString()
    };
    memoryMessages.unshift(newMessage);
    return newMessage;
  }
};

const updateMessageStatus = async (id, status = 'read') => {
  try {
    await query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    memoryMessages = memoryMessages.map(m => m.id === Number(id) ? { ...m, status } : m);
    return true;
  } catch (error) {
    memoryMessages = memoryMessages.map(m => m.id === Number(id) ? { ...m, status } : m);
    return true;
  }
};

const deleteMessage = async (id) => {
  try {
    await query('DELETE FROM contact_messages WHERE id = ?', [id]);
    memoryMessages = memoryMessages.filter(m => m.id !== Number(id));
    return true;
  } catch (error) {
    memoryMessages = memoryMessages.filter(m => m.id !== Number(id));
    return true;
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  saveMessage,
  updateMessageStatus,
  deleteMessage,
};
