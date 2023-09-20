import NextAuth,  { NextAuthOptions } from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import api from '../../../libs/api';
import { User } from '../../../types/User';


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider ({
          id: 'credentials',
            credentials: {
                email: {label: 'E-mail', type: 'text'},
                password: {label: 'Senha', type: 'password'}
            },
            authorize: async (credentials , req) => {
                if(credentials && credentials.email && credentials.password){
                    const user = await api.getUserFromEmail(credentials.email, credentials.password);
                    // const password = await api.getPassword(credentials.password);
                    if(user ){
                        return{
                            id: (user.id).toString(),
                            name: user.name,
                            email: user.email,
                            telefone: user.telefone,
                            endereco: user.endereco,   
                        }
                    }
                }
             
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user ){
                token.user = user;
                
            }
            return token
        },
        session: async ({ session, token }) => {
            if(token){
                session.user = token.user as User;
                
            }
            return session
        }
    },
    pages: {
        signIn: '/Login'
    }
}

export default NextAuth(authOptions);


 