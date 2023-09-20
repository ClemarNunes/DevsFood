import { useState } from "react";
import styles from './Cadastro.module.css'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import PageAnimation from "../../components/PageAnimation";

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';


const createUserFormSchema = z.object({
    name: z.string()
        .nonempty('Name is required')
        
        ,
    email: z.string()
        .nonempty('E-mail is required')
        .email('Invalid email format'),
    password: z.string()
        .min(6, 'Password must have at least 6 numbers'),
    phoneNumber: z.string()
        .nonempty('Telephone is required'),
    endereço: z.string()
        .nonempty('Address is required'),            
              
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export const Cadastro = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumberInput, SetPhoneNumberInput] = useState('');
    const [andressInput, SetandressInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
     
    const { register, handleSubmit, formState: {errors} } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })
    
    const router = useRouter();

    const handleSaveForm = async () => {
        if(nameInput && emailInput){
            const req = await fetch(`/api/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    name: nameInput,
                    email: emailInput,
                    telefone: phoneNumberInput,
                    endereco: andressInput,
                    password: passwordInput,  
                })
            });
            const json = await req.json();
            if(json.status){
                toast.success('registration completed successfully!', {
                    autoClose: 1000,
                    position: "top-right"
                })
        
                setTimeout(() => {
                    router.push('/Login')
                }, 2000)
            }else{
                alert(json.error);
            }
        }
    }


    return(
        <main className={styles.Container}>
             <ToastContainer />
              <PageAnimation>
            <form className={styles.formArea} onSubmit={handleSubmit(handleSaveForm)}>
                <span style={{fontWeight:'bold', fontSize: '17px'}}>Create an account</span>
                <div className={styles.camposArea}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        className={styles.input}
                        type="text" 
                        value={nameInput}
                        placeholder="Type the user name"
                        {...register('name')}
                        onChange={e => setNameInput(e.target.value)}
                    />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>  }
                </div>

                <div className={styles.camposArea}>
                    <label htmlFor="email">Email:</label>   
                    <input 
                        className={styles.input}
                        type="text" 
                        value={emailInput}
                        placeholder="Type the user e-mail"
                        {...register('email')}
                        onChange={e => setEmailInput(e.target.value)}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.camposArea}>
                    <label htmlFor="">Mobile number:</label>
                    <input 
                        className={styles.input}    
                        type="text" 
                        placeholder="Type your phone number" 
                        {...register('phoneNumber')}
                        onChange={e => SetPhoneNumberInput(e.target.value)}
                    />
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message}</span>}
                </div>

                <div className={styles.camposArea}>
                    <label htmlFor="">Address:</label>
                    <input 
                        className={styles.input}    
                        type="text" 
                        placeholder="Type your address" 
                        {...register('endereço')}
                        onChange={e => SetandressInput(e.target.value)}   
                    />
                    {errors.endereço && <span className={styles.error}>{errors.endereço.message}</span>}
                </div>

                <div className={styles.camposArea}>
                    <label htmlFor="password">Password:</label>
                    <input 
                        className={styles.input}    
                        type="password" 
                        // onChange={e => setPasswordInput(parseInt(e.target.value))}
                        placeholder="Type your password" 
                        {...register('password')}
                        onChange={e => setPasswordInput(e.target.value)}
                    />
                    {errors.password && <span className={styles.error}>{errors.password?.message}</span>  }
                </div>

                <button  type="submit">Continue</button>
            

            </form>
            </PageAnimation>
        </main>
    );
}

export default Cadastro