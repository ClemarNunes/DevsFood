import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import Cart from '../../public/assets/cart.png'
import { useState }  from 'react';
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { CartItemInformation } from '../../types/CartItemInformation'
import 'react-toastify/dist/ReactToastify.css'

import { InitialState } from '../../types/InitialState';  

type StateType = {
    CartReducer: InitialState
}

 
export default () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: session } = useSession()
    const userId = session?.user.id

    const names: string[] = [];
    const images: string[] = [];
    const qts: string[] = [];
    const ingredient: string[] = [];

  
    let total = 0
    let desconto = 0
    let subtotal = 0
    let pegarSubtotal =0
    // let data = '10/10/2010'


    const products = useSelector((state: StateType) => state.CartReducer.products );  
    
    const handleCartClick = () => {
        setShow(!show) //isso faz o tuggle, se ta true vai para false  ou o contrario
        
    }

    const handleProductChange = (key:number, type: string) => {
        dispatch({
            type: 'CHANGE_PRODUCT',
            payload: {key, type}
        })
    }



    const teste = () => {
        let now = new Date();
        console.log(now)
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let hour = now.getHours();
        let minuts = now.getMinutes();
        let periodo = '';
        
        // if(hour >= 12){
        //     periodo= 'PM'
        // }else{
        //     periodo = 'AM'
        // }

        {hour >= 12 ? periodo = 'PM' : periodo = 'AM'}

        return `${addZeroToDate(day)}/${addZeroToDate(month + 1)}/${year} at ${addZeroToDate(hour)}:${addZeroToDate(minuts)} ${periodo}`
    }
    const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`;




    
    const handleOder = () => {
        let Teste = [...products]
        for(let i in Teste){
            const {image,ingredients, name, qt } = Teste[i]
            images.push(image)
            ingredient.push(ingredients) 
           names.push(name)
           qts.push((qt).toString())
        }
  
        dispatch({ type: 'ADD_COMPRA', payload: {Teste} });

        products.length = 0;
        const data = teste()
        addItens(images,ingredient,   names, qts, data   )

        setTimeout(() => {
            router.push('/AreaPedidos');
        }, 2000);
       
    }
   

    const addItens = async ( images:string[],  ingredient:string[], names: string[], qts: string[], data: string ) => {
        
        const req = await fetch(`/api/informations`,{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                subtotal,
                total,
                data,
                userId,
                images,
                ingredient,
                names,
                qts,  
            })
        })
  
        const json = await req.json();
        if(json.status){
            toast.success('Order placed successfully!', {
                autoClose: 800,
                position: "top-center"
            })
        }
    }
  
    const calcula = () => {
        for(let item of products){ 
            pegarSubtotal += item.price * item.qt 
        }
        return  pegarSubtotal
    }

    {subtotal = calcula()}
    {desconto = (subtotal * 0.1)}
    {total = subtotal - desconto}     

    return(
        <div className={styles.CartArea}>
            <ToastContainer />
            <div className={styles.CartHeader} onClick={handleCartClick}>
               <div className={styles.CartHeaderArea}>
                    <Image src={Cart} width={30} height={30} style={{padding: `${10}px`}} />
                    <div className={styles.CartText}>My Cart ({products.length})</div>
                    {show && 
                            <div> <img src="/assets/down.png" alt="" width={25} height={25} /> </div>
                    }
               </div>
               
            </div>

            <div className={styles.CartBody} style={{display: (show === true ? 'block' : 'none')}}>
               <div className={styles.ProductsArea}>
                    {products.map((item: CartItemInformation, index: number) => (
                       
                        <div className={styles.ProductItem} key={index}>

                            <img src={item.image} alt="" width={64} height={'auto'} style={{borderRadius: '10px'}} />

                            <div className={styles.ProductInfoArea}>
                                <div className={styles.ProductName}>{item.name}</div>
                                <div className={styles.ProductPrice}>R${item.price}</div>
                            </div>

                            <div className={styles.ProductQuantityArea}>
                                <img src={'/assets/categories/minus.png'} alt="" onClick={() => handleProductChange(index, '-')} />
                                    <div className={styles.ProductQt}>{item.qt}</div>
                                <img src="/assets/categories/plus.png" alt="" onClick={() => handleProductChange(index, '+')} />
                            
                            </div>
                        
                        </div>
                    
                    ))}

                    {products.length > 0 &&
                        <>
                              
                            {session && 
                                <div className={styles.endereco}>
                                    <div>{session.user.endereco}</div>
                                <img src="/assets/edit.png" alt="" width={25} height={'auto'} />
                                </div>

                            }
                            <div className={styles.descontoArea}>
                               <div className={styles.desconto}>
                                    <span>Discount coupon:</span>
                                    <input type="text" placeholder='DESCONTO' />
                               </div>
                            </div>

                            <div className={styles.AreaSubToal}>

                                <div className={styles.descontoItem}>
                                    <div>Subtotal</div>
                                    <div>R${subtotal}</div>
                                </div>

                                <div className={styles.descontoItem}>
                                    <div>Discount</div>
                                    <div>(-10%)</div>
                                </div>
                               
                                <div className={styles.descontoItem }>
                                    <div>Total</div>
                                    <div>R${(total).toFixed(2)}</div> 
                                </div>

                                <button onClick={handleOder}>Checkout</button>

                            </div>
                        </>
                    }
               </div> 

               {products.length === 0 &&
                    <div className={styles.avisoArea}>
                        <div className={styles.aviso}>Your shopping cart is empty</div>
                    </div>        
                }

            </div>

        </div>
    )
}

