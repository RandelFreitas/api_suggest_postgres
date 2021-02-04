const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

module.exports = {
  async signUp(req, res){
    const { name, email, password } = req.body;
    try{
      if(await User.findOne({where: {email}})){
        return res.status(400).send({err: "Email já cadastrado."});
      }

      var passwordEncrypt = await bcrypt.hash(password, 10);

      await User.create({
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

  async update(req, res){
    const { user_id } = req;
    try{
      await User.update(req.body, {where: {id: user_id}});

      return res.status(201).send({success: "Usuário atualizado com sucesso."});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no servidor."})
    }
  },
  
  async signIn(req, res){
    const { email, password } = req.body;
    try{
      const user = await User.findOne({where: {email}});
      
      if(!user){
        return res.status(400).send({err: "Usuário não existe."});
      }
      if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({err: "Senha ou email inválidos."});
      }
      
      const token = jwt.sign({id: user.id}, process.env.SECRET, {
        expiresIn: 86400,
      });

      return res.send({token});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no login."});
    }
  },
  
  async fogotPassword(req, res){
    const { email } = req.body;
    try{
      const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(400).send({err: 'Usuário não encontrado.'})
      }
      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();

      now.setHours(now.getHours()+1);
      
    }catch(e){
      console.log(e);
      return res.status(400).send({err: 'Erro ao resetar a senha, tente novamente mais tarde.'});
    }
  },

  async resetPassword(req, res){
    const { email, token, password } = req.body;
    const now = new Date();
    try{
      const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(400).send({err: 'Usuário não encontrado!'});
      }
      if(token !== user.passwordResetToken){
        return res.status(400).send({err: 'Token inválido'});
      }
      if(now > user.passwordResetExpires){
        return res.status(400).send({err: 'Token expirado, recupere novamente a senha.'});
      }
      user.password = password;
      await user.save();
      return res.send({success: 'Senha recuperada com sucesso.'});
    }catch(err){
      console.log(e);
      return res.status(400).send({err: 'Erro ao resetar senha, tente novamente mais tarde.'});
    }
  },
  async logout(req, res){
    return res.json({"Func": "logout"});
  }
}