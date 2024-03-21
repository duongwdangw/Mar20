const { User } = require("../models/user");

// Tạo người dùng mới
const createUser = async (user) => {
  const { email, name, dateOfBirth, address, nationality, pass } = user;
  const newUser = await User.create({
    email,
    name,
    dateOfBirth,
    address,
    nationality,
    pass,
  });
  return newUser;
};

// Lấy tất cả người dùng
const getAllUser = async () => {
  const users = await User.find().lean();
  return users;
};

// Cập nhật người dùng
const updateUser = async (body) => {
    const { email, name, dateOfBirth, address, nationality, pass } = body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        name,
        dateOfBirth,
        address,
        nationality,
        pass,
      },
      {
        new: true,
      }
    );
    return updatedUser;
};

// Xóa người dùng
const deleteUser = async () => {
  const user = await User.findOneAndDelete();
  return user;
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};
