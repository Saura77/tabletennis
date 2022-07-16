const helpers = {};

helpers.isAutenthicated = (req, res, next) => {
    if(req.isAutenthicated()){
        return next;
    }
    req.flash('error_msg','No autorizado');
    res.redirect('/users/signin');
}

module.exports = helpers;