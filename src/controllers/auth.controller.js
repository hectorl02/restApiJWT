import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const { username, password, email, roles } = req.body;
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({name: "user"});
        newUser.roles = [role.id];
    }
    
    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 1200//20 min
    });
    res.status(200).json({token});
}

export const signIn = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    if (!userFound) return res.status(400).json({message:'Usuario no encontrado'});
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({token: null, message: 'Pass Invalido'});
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 1200//20 min
    });
    console.log(userFound);
    res.json({token:""})

}