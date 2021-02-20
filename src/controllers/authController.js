const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../resources/mailer');

const crypto = require('crypto');
const User = require('../models/Adm/User');

module.exports = {
  //LOGIN
  async signIn(req, res){
    const { email, password } = req.body;
    try{
      const user = await User.findOne({where: {email}});
      
      if(!user){
        return res.status(401).send({err: "Usuário não existe."});
      }
      if(!await bcrypt.compare(password, user.password)){
        return res.status(401).send({err: "Senha ou email inválidos."});
      }
      
      const token = jwt.sign({id: user.id, tenant_id: user.tenant_id}, process.env.SECRET, {
        expiresIn: 86400,
      });
      const { name, id } = user;

      return res.send({name, id, token});
    }catch(e){
      console.log(e);
      return res.status(400).send({err: "Erro no login."});
    }
  },
  //ESQUECI A SENHA
  async fogotPassword(req, res){
    const { email } = req.body;
    try{
      const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(400).send({err: 'Usuário não encontrado.'});
      };

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();

      now.setHours(now.getHours()+1);
      await User.update({
        password_reset_token: token,
        password_reset_expires: now,
      }, {where: {id: user.id}});

      mailer.sendMail({
        to: email,
        from: '"SuggestInBox" <recuperarsenha@suggestinbox.com.br>',
        subject: 'Recuperação de senha',
        template: '/fogot_password',
        context: { token, email }
      }, (err) => {
        if(err){
          console.log(err);
          return res.status(400).send({err: "Email não enviado, tente mais tarde."});
        }
        return res.send({success: "Email enviado com sucesso."});
      });
    }catch(e){
      console.log(e);
      return res.status(400).send({err: 'Erro ao resetar a senha, tente novamente mais tarde.'});
    }
  },
  //RESET DE SENHA
  async resetPassword(req, res){
    const { email, token, password } = req.body;
    const now = new Date();
    try{
      const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(400).send({err: 'Usuário não encontrado.'});
      }
      if(token !== user.password_reset_token){
        return res.status(401).send({err: 'Token inválido.'});
      }
      if(now > user.password_reset_expires){
        return res.status(401).send({err: 'Token expirado, recupere novamente a senha.'});
      }
      var passwordEncrypt = await bcrypt.hash(password, 10);
      
      await user.update({password: passwordEncrypt}, {where: {id: user.id}});
      return res.send({success: 'Senha recuperada com sucesso.'});
    }catch(err){
      console.log(e);
      return res.status(400).send({err: 'Erro ao resetar senha, tente novamente mais tarde.'});
    }
  },
  //LOGOUT TOKEN
  async logout(req, res){
    return res.json({"Func": "logout"});
  },
  //OBTER USUARIO TESTE
  async teste(req, res){
    const { email } = req.body;
    try{
      const user = await User.findOne({where: {email}});

      return res.send(user);
    }catch(e){
      console.log(e);
    }
  }
}