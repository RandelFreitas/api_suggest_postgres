module.exports = {
  signUp(req, res){
    return res.json({"Func": "sign-up"});
  },
  signIn(req, res){
    return res.json({"Func": "sign-in"});
  },
  fogotPassword(req, res){
    return res.json({"Func": "fogot-password"});
  },
  resetPassword(req, res){
    return res.json({"Func": "reset-password"});
  },
  logout(req, res){
    return res.json({"Func": "logout"});
  }
}