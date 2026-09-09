const { getProfile, updateProfile } = require('../services/profileService');
const { sendSuccess, sendError } = require('../utils/response');

const getPublicProfile = async (req, res, next) => {
  try {
    const profileData = await getProfile();
    if (!profileData) {
      return sendError(res, 'Profile information not found', 404);
    }
    return res.status(200).json(profileData);
  } catch (error) {
    next(error);
  }
};

const updateAdminProfile = async (req, res, next) => {
  try {
    const updated = await updateProfile(req.body);
    return sendSuccess(res, updated, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicProfile,
  updateAdminProfile,
};
