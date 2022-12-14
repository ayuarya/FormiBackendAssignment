const bcrypt = require('bcryptjs');
const Event = require('../models/event')
const User = require('../models/user');

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword,
          eventsPinned: { events: [] }
        });
        return user.save();
      })
      .then(result => {
        res.redirect('/auth/login');
      });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postLogin=(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect('/auth/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log(req.session.isLoggedIn)
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/auth/login');
        })
        .catch(err => {
          res.redirect('/auth/login');
        });
    })
    .catch(err => console.log(err));
}
exports.getSignUp=(req,res,next)=>{
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  });
}

exports.postLogout=(req,res,next)=>{
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}

exports.getSignup=(req,res,next)=>{
  res.render('auth/signup',{
    path:'/signup',
    pageTitle:'Signup'
  })
}

exports.getLogin=(req,res,next)=>{
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login'
  });
}