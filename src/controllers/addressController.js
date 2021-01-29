const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {
  async postAddress(req, res){
    const { user_id } = req.params;

    const user = await User.findOne({where: {id: user_id}});

    if(!user){
      return res.status(400).send({err: "Usuário não encontrado."});
    }

    try{
      await Address.create(req.body)
        .then((response) => {
          User.update(
          {address_id: response.id},
          {where: {id: user_id}});
        }
      );
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro ao cadastrar endereço."})
    }
    
    return res.send({success: "Endereço cadastrado com sucesso."});
  }
}