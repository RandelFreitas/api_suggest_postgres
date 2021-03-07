const bcrypt = require('bcryptjs');
const User = require('../../models/Adm/User');
const Address = require('../../models/Shared/Address');

module.exports = {
  //UPDATE DE DADOS DE USUÁRIO E ENDEREÇO
  async updateUser(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    
    let obj = req.body;
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === "" || obj[propName] === undefined) {
          delete obj[propName];
      };
    };

    try{
      const user = await User.findByPk(id);
      if(!user){
        return res.status(400).send({err: "Usuário não encontrado."});
      };
      if(tenant_id !== user.tenant_id){
        return res.status(401).send({err: "Usuário não pertence ao Adm."});
      };

      await User.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        cpf: req.body.cpf
      }, {where: {id, tenant_id}}).then(async () => {
        const address = await Address.findOne({where: {user_id : id}});
        if(!address){
          await Address.create({
            user_id: id,
            state: req.body.address.state,
            city: req.body.address.city,
            street: req.body.address.street,
            number: req.body.address.number,
            type: req.body.address.type,
            district: req.body.address.district,
            zipcode: req.body.address.zipcode,
            obs: req.body.address.obs 
          });
        }else{
          await Address.update({
            state: obj.address.state,
            city: obj.address.city,
            street: obj.address.street,
            number: obj.address.number,
            type: obj.address.type,
            district: obj.address.district,
            zipcode: obj.address.zipcode,
            obs: obj.address.obs 
           }, {where: {user_id: id}}
          );
        };
      });

      return res.status(201).send({success: "Usuário atualizado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //OBTER USUÁRIO POR ID
  async getUserById(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    
    try{
      const user = await User.findByPk(id, {include: {association: 'address'}});
      
      if(!user){
        return res.status(400).send({err: "Usuário não cadastrado."});
      };

      if(tenant_id !== user.tenant_id){
        return res.status(401).send({err: "Usuário não pertence ao Adm."});
      }
      user.password = undefined;

      return res.send(user);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  }
}