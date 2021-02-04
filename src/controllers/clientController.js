module.exports = {
  getMenu(req, res){
    return res.json({"Func": "menu"});
  },
  getCompanyInfos(req, res){
    return res.json({"Func": "infos"});
  },
  addSuggest(req, res){
    return res.json({"Func" : "addSuggest"})
  },
  addCall(req, res){
    return res.json({"Func" : "addCall"})
  }
}