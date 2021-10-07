import { Router } from "express";
import productoRouter from './productos';
import userRouter from './user';
import passport from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/auth';
const router = Router();

router.use('/productos',productoRouter);

router.get('/registro', (req, res) => {
  res.render('registro')
});

router.get('/iniciosesion', (req, res) => {
  res.render('inicio')
});

router.post('/login', (req, res,next) =>{
  passport.authenticate('login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) return res.render('loginerr');

    const usern = user.username
    res.render('main',{usern});
  })(req, res, next);
  });
  
router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, user, info) {
    //   console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.render('registererr');
  
      res.render('inicio');
    })(req, res, next);
});
  
  
router.use('/users', isLoggedIn, userRouter);
export default router;