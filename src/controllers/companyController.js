const Company = require('../models/Company');

module.exports = {
  async getAllCompanies(req, res){
    const { user_id } = req;
    try{
      const companies = await Company.findAll({where: {user_id}});

      return res.send(companies);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  async getByIdCompany(req, res){
    const { user_id } = req;
    const { id } = req.params;
    try{
      const companies = await Company.findOne({where: {id, user_id}});

      return res.send(companies);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  async addCompany(req, res){
    const { user_id } = req;
    try{
      await Company.create({
        user_id,
        name: req.body.name,
        cnpj: req.body.cnpj,
        slogan: req.body.slogan,
        history: req.body.history,
        localization: req.body.localization,
        email: req.body.email,
        phone: req.body.phone,
        img_url: req.body.img_url,
        zipcode: req.body.zipcode,
        street: req.body.street,
        number: req.body.number,
        district: req.body.district,
        state: req.body.state,
        city: req.body.city,
        type: req.body.type,
        obs: req.body.obs,
      });

      return res.status(201).send({success: "Companhia cadastrada com sucesso."})
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."})
    }
  },
  async updateCompany(req, res){
    return res.json({"Func": "update"});
  },
  async deleteCompany(req, res){
    return res.json({"Func": "delete"});
  }
}