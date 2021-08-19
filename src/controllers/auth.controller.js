import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    try {
        const { username, password, email, roles } = req.body;
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });

        if (req.body.roles) {
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }
        
        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 1800//30 min
        });
        res.status(200).json({token});
    } catch (error) {
        console.log('error en el SignUp')
        return res.status(500).json(error);
    }
}

export const signIn = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");

        if (!userFound) return res.status(400).json({message:'Usuario no encontrado'});
        
        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        console.log(req.body.password);
        console.log(userFound.password);
        if (!matchPassword) return res.status(401).json({token: null, message: 'Pass Invalido'});
        
        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 1800//30 min
        });
        res.json({token})
    } catch (error) {
        console.log('error en SingIn');
        return res.status(500).json(error);
    }
    
}