const User = require('../models/Adm/User');
const Adm = require('../models/Adm/Adm');
const Address = require('../models/Shared/Address');

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
  //CADASTRO DE ENDEREÇO DO USUÁRIO
  async addUserAddress(req, res){
    const { user_id } = req.body;
    try{
      const user = await User.findByPk(user_id);
      if(!user){
        return res.status(400).send({err: "Usuário não encontrado."});
      }
      await Address.create(req.body);

      return res.status(201).send({success: "Endereço cadastrado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //UPDATE DE USUÁRIO
  async update(req, res){
    const { user_id } = req;
    try{
      await User.update(req.body, {where: {id: user_id}});

      return res.status(201).send({success: "Usuário atualizado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."});
    }
  },
  //--------------------------------------------------------------------------------------//
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
  //OBTER USUÁRIO POR ID
  async getUserById(req, res){
    const { tenant_id } = req;
    const { id } = req.params;
    
    try{
      const user = await User.findByPk(id);
      
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