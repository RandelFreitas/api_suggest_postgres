module.exports = {
  getAllCompanies(req, res){
    return res.json({"Func": "get-all"});
  },
  getByIdCompany(req, res){
    return res.json({"Func": "by-id"});
  },
  addCompany(req, res){
    return res.json({"Func": "add"});
  },
  updateCompany(req, res){
    return res.json({"Func": "update"});
  },
  deleteCompany(req, res){
    return res.json({"Func": "delete"});
  }
}