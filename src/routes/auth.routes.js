// autentificacion
import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller';
import {verifySignup} from '../middlewares';

const router = Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

router.post('/signup', [verifySignup.checkRolesExisted ,verifySignup.checkDuplicateUserOrEmail], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
export default router;