const isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next()
    } else {
        res.send({
            error: "User is not authenticated!"
        })
    }
}
module.exports = isAuthenticated