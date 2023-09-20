import { NextApiHandler } from "next";
import api from "../../../libs/api";
 

//Reading user info
const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const user = await api.getUser(parseInt(id as string));

    if(user){
        res.json({status: true, user});
        return;
    }

    res.json({error: 'Usuário não encontrado'})

}

const handlerPut: NextApiHandler = async (req, res) => {
    const {name, active} = req.body;
    const { id } = req.query;

    const updateUser = await api.updateUser(
            parseInt(id as string),
            name, active
        );

    if(updateUser){
        res.json({ status: true, user: updateUser })
        return
    }
    res.json({error: 'não foi possivel alterar esse usuário'});
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const deleteUser = await api.deleteUser(parseInt(id as string))
    .catch(() => {
        res.json({ error: 'Usuário não encontrado' })
    });

    if(deleteUser){
        res.json({ status: true }); 
    }
   

}


const handler: NextApiHandler = async (req, res) => {
    switch(req.method){
        case 'GET':
            handlerGet(req, res);
        break;
        case 'PUT':
            handlerPut(req, res);
            break;
        case 'DELETE':
            handlerDelete(req, res);
        break;
    }
}

export default handler;