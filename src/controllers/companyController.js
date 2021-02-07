const Company = require('../models/Company');

module.exports = {
  //GET AL COMPANIES
  async getAllCompanies(req, res){
    const { tenant_id } = req;
    try{
      const companies = await Company.findAll({where: {tenant_id}});

      return res.send(companies);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //GET BY ID
  async getByIdCompany(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    try{
      const company = await Company.findByPk(id);

      if(!company){
        return res.status(400).send({err: "Compania não existe."});
      };

      if(!(tenant_id === company.tenant_id)){
        return res.status(401).send({err: "Companhia não pertence ao usuário."});
      };

      return res.send(company);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    };
  },
  //ADD COMPANY
  async addCompany(req, res){
    const { tenant_id } = req;
    try{
      await Company.create({
        tenant_id,
        name: req.body.name,
        cnpj: req.body.cnpj,
        slogan: req.body.slogan,
        history: req.body.history,
        localization: req.body.localization,
        email: req.body.email,
        phone: req.body.phone,
        img_url: req.body.img_url,
      });

      return res.status(201).send({success: "Companhia cadastrada com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    };
  },
  //UPDATE COMPANY
  async updateCompany(req, res){
    return res.json({"Func": "update"});
  },
  //DELETE COMPANY
  async deleteCompany(req, res){
    return res.json({"Func": "delete"});
  },
};