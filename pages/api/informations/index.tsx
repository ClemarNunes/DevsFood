import { NextApiHandler } from "next";
import apiInformation from "../../../libs/apiInformation";


const handlePostInformations: NextApiHandler = async (req, res) => {
    const { subtotal, total, data, userId, names, images,qts, ingredient   } = req.body;
    const information = await apiInformation.PostInformations(subtotal, total, data, parseInt(userId) , images, ingredient,names, qts);
    
    if(information){
        res.json({ status: true, information })
        return;
    }  
}


const handleGetInformations: NextApiHandler = async (req, res) => {
    const informations = await apiInformation.GetInformation();
    if(informations){
        res.json({status: true, informations});
        return;
    }
}


const handler: NextApiHandler = async (req, res) => {
    switch(req.method){
        case 'GET':
            handleGetInformations(req, res)
        break;
        case 'POST':
            handlePostInformations(req, res)
        break;
    }
}

export default handler;