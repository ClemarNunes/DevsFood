import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from './Login.module.css'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import  PageAnimation  from '../../components/PageAnimation'
 



const createUserFormSchema = z.object({
    email: z.string()
        .nonempty('Email is required'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')    
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);  

    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    }) 


    const handlerSubmit = async () => {
        setHasError(false);
        const request  = await signIn('credentials', {
            redirect: false,
            email, password
        });
        if(request && request.ok){
            if(router.query.callbackUrl){
                router.push(router.query.callbackUrl as string)
            }else{
                router.push('/')
            }
        }else{
            setHasError(true)
        }
    }

    return(
       
        <main className={styles.Container}>
           
            <div className={styles.fundo}>
            <PageAnimation>
                    
                <form className={styles.areaLogin} onSubmit={handleSubmit(handlerSubmit)}>

                    <h1>Log<span style={{color: 'red'}}>in</span></h1>
                    <div className={styles.camposLogin}>
                        <label htmlFor="email"> Email </label>
                        <input 
                            type="text" 
                            placeholder="Enter your E-mail"
                            value={email}
                            {...register('email')}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}
                    </div>


                    <div className={styles.camposLogin}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your Password"
                            value={password}
                            {...register('password')}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}  
                    </div>
                    
                    <div className={styles.position}>
                        <button type="submit">Continue</button>
                        {hasError &&  <div style={{color: 'red'}}>Your email or password is incorrect.</div>}
                    </div>
                    <div className={styles.cadastro}>Don't have an account yet? <span className={styles.signUp} > <Link href='/Cadastro'> Sign Up </Link></span>  </div>

                </form> 
                </PageAnimation>
            </div>
        </main>   
    )
}  


export default Login;