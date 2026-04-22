import User from "../models/User.js";

export async function createUser(userData) {
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,

    // 👇 viktigt
    role: userData.role || "user"
  });

  await user.save();
  return user;
}

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}
