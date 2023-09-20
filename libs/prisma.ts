import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;

}

export const prisma = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !==  'production'){
    global.prisma = prisma;
}

export default prisma;

// criado para não fazer uma nova conexão a cada vez que salvamos algo no codigo.
// assim só fará uma coneção ao banco de dados quando rodar o npm run dev