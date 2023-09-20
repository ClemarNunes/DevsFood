import prisma from "./prisma";
 

export default {
    PostInformations: async (subtotal: number, total: number, data: string, userId: number, images: string[],ingredient: string[], names: string[], qts:string[]) => {
        const userInformations = await prisma.information.create({
            data: { total, subtotal, data, userId, images, ingredient, names, qts, }

        });

        return userInformations
    },
    GetInformation: async () => {

        const information = await prisma.user.findMany({
                
            include: {
                information: true,
            }
           
        })

        return JSON.parse(JSON.stringify(information))
    }
 
}





