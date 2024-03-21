const {Profile} = require('../models/profile');


const updateProfile = async (id, body) => {
  const profile = await Profile.findByIdAndUpdate(id, {
    skill,
    hobby,
    aim,
  });
};

const deleteProfile = async (profileId, callback) => {
  const index = Profile.findIndex(
    (profile) => profile.id === parseInt(profileId)
  );
  if (index) {
    Profile.splice(index, 1);
    callback(null, { success: true });
  } else {
    callback("user not found", null);
  }
};

module.exports = {
    updateProfile,
    deleteProfile
}

