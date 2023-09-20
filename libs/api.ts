import prisma from "./prisma";

export default {
    getAllUsers: async (page: number) => {
        //items  per page
        let take = 2;
        //offset of items
        let skip = 0;
        
        if(page){
            skip = ( page -1) * take;
        }
        const users = await prisma.user.findMany({
            skip,
            take,
            where: { //eu filtro o que eu quero / retorna usuarios ativos
                active: true
            },
            select: { //eu filtro o que eu quero e o que eu não quero.   /retorna esses dados abaixo  
                id: true,
                name: true,
                email: true,

            },
            orderBy: { //ordenar em ordem alfabetica
                name: 'asc'
            }
        });
        return users

    },
    addUser: async (name: string, email: string, telefone: string, endereco: string, password:string  ) => {
        const newUser = await prisma.user.create({
            data: { name, email, telefone, endereco, password }
        });
        return newUser;
    },
    getUserFromEmail: async (email: string, password: string) => {
        const user = await prisma.user.findUnique({ //findunique apenas 1 condição /para pegar um usuario pelo ID e somente os ativos devo mudar a função para findFirst e passa o outro parametro na função
            where: { email, password }
        });
        return user
    },
    getPassword: async (password: string) => {
        const senha = await prisma.user.findMany({
            where: { password }
        });
        return senha
        
    },
    getUser: async (id: number) => {
        const user = await prisma.user.findUnique({ //findunique apenas 1 condição /para pegar um usuario pelo ID e somente os ativos devo mudar a função para findFirst e passa o outro parametro na função
            where: {
                id //parse int só aceita uma string pois qd pego do query pode vim um array de string, então eu digo ao parse que ele irá realmente receber uma string
            }
        });
        return user
    },
    updateUser: async (id: number, name?: string, active?: string) => {
        let data: {
            name?: string;
            active?: boolean;
        } = {};

        if(name){
            data.name = name;
        }
        if(active){
            switch(active){
                case 'true':
                    data.active = true;
                break
                case 'false':
                    data.active = false;
                break
            }
        }
    
        const updateUser = await prisma.user.update({
            where: { id },
            data
        });
        return updateUser
    },
    deleteUser: async (id: number) => {
        const deleteUser = await prisma.user.delete({
            where: { id }
        });
        return deleteUser;
    }

}