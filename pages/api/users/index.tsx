import { NextApiHandler } from "next";
// import { Users } from "../../../utils/users";
import prisma from '../../../libs/prisma'
import api from "../../../libs/api";

//obs REVISAR A PARTE DE FILTROS 

//Getting all users
const handlerGet: NextApiHandler = async (req, res) => {
    const { page } = req.query;

    const users = await api.getAllUsers(parseInt(page as string));
   res.json({status: true , users })
}


// Inserting new User
const handlerPost: NextApiHandler = async (req, res) => {
    const {name, email,telefone, endereco, password  } = req.body;

    const newUser = await api.addUser(name, email, telefone, endereco, password )
    .catch(() => {
        res.json({ error: 'E-mail já existe, use um outro.' })
    });

    if(newUser){
        res.json({ status : true, user: newUser })
    }
   
}


const handlerPassword: NextApiHandler = async (req, res) => {
    const { password } = req.body;

    const passwords = await api.getPassword(password)
    res.json({status: true, passwords})
} 

const handler : NextApiHandler = (req, res) => {
   switch(req.method){
        case 'GET':
            handlerGet(req, res);
        break;

        case 'POST':
            handlerPost(req, res);
        break;
        
   }
    
}

export default handler;