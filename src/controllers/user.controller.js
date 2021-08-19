import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const rolesFound = await Role.find({ name: { $in: roles } });
        const user = new User({username, email, password, roles: rolesFound.map((role) => role._id) });
        user.password = await User.encryptPassword(user.password);
        const savedUser = await user.save();
        return res.status(200).json({
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          roles: savedUser.roles,
        });
      } catch (error) {
          console.log('Err: CreateUser')
          console.error(error);
      }
};

export const getUsers = async (req, res) => {};
export const getUser = async (req, res) => {};
