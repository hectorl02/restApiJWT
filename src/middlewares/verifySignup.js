//si ya existen objetos validador
import { ROLES } from "../models/Role";
import User from "../models/User";


const checkDuplicateUserOrEmail = async (req, res, next) => {
    try {
        const user= await User.findOne({username: req.body.username});
        
        if (user) return res.status(400).json({message: 'el usuario ya existe'});
        
        const email= await User.findOne({email: req.body.email});
        
        if (email) return res.status(400).json({message: 'el email ya existe'});
        
        next();
    } catch (error) {
        console.log('Error: user o mail duplicado');
        res.status(500).json({ message: error });
        
    };
    
};

const checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} no existe`
                })
            };
        };
    };
    next();
}

export { checkDuplicateUserOrEmail, checkRolesExisted };
