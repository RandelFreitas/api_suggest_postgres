const Company = require('../models/Company/Company');
const Address = require('../models/Shared/Address');

module.exports = {
  //OBTER TODAS COMPANHIAS
  async getAllCompanies(req, res){
    const { tenant_id } = req;
    
    try{
      const companies = await Company.findAll({
        include: { association: 'address'},
        where: {tenant_id}
      });

      return res.send(companies);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //CADASTRO DE ENDEREÇO PARA COMPANHIA
  async addCompanyAddress(req, res){
    const { company_id } = req.body;
    try{
      const company = await Company.findByPk(company_id);
      
      if(!company){
        return res.status(400).send({err: "Companhia não encontrada."});
      }

      await Address.create(req.body);

      return res.status(201).send({success: "Endereço cadastrado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //OBTER COMANHIA POR ID
  async getByIdCompany(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    try{
      const company = await Company.findByPk(id, {include: { association: 'address'}});

      if(!company){
        return res.status(400).send({err: "Compania não existe."});
      };

      if(tenant_id !== company.tenant_id){
        return res.status(401).send({err: "Companhia não pertence ao usuário."});
      };

      return res.send(company);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    };
  },
  //ADICIONAR COMPANHIA
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
  //ATUALIZAR COMPANHIA
  async updateCompany(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    let obj = req.body;
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === "" || obj[propName] === undefined) {
          delete obj[propName];
      }
    }

    try{
      const company = await Company.findByPk(id);
      if(!company){
        return res.status(400).send({err: "Companhia não encontrada."});
      };
      if(tenant_id !== company.tenant_id){
        return res.status(401).send({err: "Companhia não pertence ao Adm."});
      };

      await Company.update({
        name: obj.name,
        cnpj: obj.cnpj,
        slogan: obj.slogan,
        history: obj.history,
        localization: obj.localization,
        email: obj.email,
        phone: obj.phone,
        img_url: obj.img_url,
        suggest: obj.suggest,
        promo: obj.promo,
        delivery: obj.delivery,
        reservation: obj.reservation,
        menu: obj.menu,
        call: obj.call,
      })
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //DELETAR COMPANHIA
  async deleteCompany(req, res){
    return res.json({"Func": "delete"});
  },
};