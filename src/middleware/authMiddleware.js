const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).send({ err: 'Token inexistente!'}); 
    }
  
    const parts = authHeader.split(' ');
    
    if(!parts.length === 2){
      return res.status(401).send({ err: 'Erro de token!'});
    }
  
    const [scheme, token] = parts;
  
    if(!/^Bearer$/i.test(scheme)){
      return res.status(401).send({ err: 'Token mal formado!' });
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err){
        return res.status(401).send({err: 'Token inválido!'})
      }
      req.tenant_id = decoded.tenant_id;

      return next();
    });
  }catch(err){
    return res.status(400).send({err: 'Serviço indisponível no momento, tente mais tarde.'})
  }
}