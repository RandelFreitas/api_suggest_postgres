const bcrypt = require('bcryptjs');
const User = require('../../models/Adm/User');
const Adm = require('../../models/Adm/Adm');
//const Address = require('../../models/Shared/Address');

module.exports = {
  //CADASTRO DE USUÁRIO
  async signUp(req, res){
    const { name, email, password } = req.body;
    try{
      if(await User.findOne({where: {email}})){
        return res.status(400).send({err: "Email já cadastrado."});
      }

      var passwordEncrypt = await bcrypt.hash(password, 10);
      const adm = await Adm.create({});

      await User.create({
        tenant_id: adm.id,
        name: name,
        email: email,
        password: passwordEncrypt
      });

      return res.status(201).send({success: "Usuário cadastrado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."})
    }
  },
  //LISTAR TODOS OS USUARIOS
  async getAllUsers(req, res){
    const { page, pageSize } = req.query;

    if(!page || !pageSize){
      return res.status(400).send({err: "Requisição mal formada."});
    }

    const offset = (page * pageSize);
    const limit = pageSize;
    
    try{
      const users = await User.findAll({
        limit, offset,
        include: { association: 'address'},
        attributes: {exclude: ['password']}
      });

      return res.send(users);
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
}