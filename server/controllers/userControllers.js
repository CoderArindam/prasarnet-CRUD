import { userModel } from "../model/userModel.js";

const createUser = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const otp = Math.floor(Math.random() * 999999);
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      otp,
    });
    await newUser.save();
    res.status(201).json({ message: "user created successfully!", newUser });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserList = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ users });
};

const updateUser = async (req, res) => {
  const { email, phone } = req.body;
  //   const existingUserByEmail = userModel.findOne({ email });
  //   const existingUserByPhone = userModel.findOne({ phone });
  //   if (existingUserByEmail || existingUserByPhone) {
  //     return res.status(501).json({ message: "email id or phone exist" });
  //   }
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "user Deleted", deletedUser });
};

const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.json(user);
};
export { createUser, getUserList, updateUser, deleteUser, getUserById };
