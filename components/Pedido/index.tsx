import styles from './pedido.module.css';
import Load from '../../components/Load'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ProductInformations } from '../../types/ProductInformations'
 
import Image from '../../components/Image'

 
type Props = {
    src: ProductInformations;
    info: number
}


// remove data {data}:Props
const Pedido = ( { src, info }: Props ) => {
    

    
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [information, setInformation] = useState<ProductInformations>()
    
    

    const { data: session } = useSession()
     

    useEffect(() => {

        const id = setInterval(() => {
            setProgress(Math.random() * 100)
            setLoading(false);
         
        }, 2000);
        setInformation(src)

        return () => {
            clearInterval(id);
        }

    }, [])

     

    return (
        <div className={styles.Container}>

            <div className={styles.load}>
                <Load value={progress} />
            </div>

            {!loading && info == 0 &&
                <div className={styles.mensagem}>You don't have orders to display.</div>
            }

            {!loading  && (info > 0) && 
                
                <div className={styles.pedidoArea} >
                    
                    <div className={styles.produtos}>
 
                        {src && 
                            <div>

                                {src.images.map((item, index) => (
                                    <div key={index}>
                                        <Image 
                                            src={item} 
                                            name={src.names[index]} 
                                            quant={src.qts[index]}  
                                            ing={src.ingredient[index]}  
                                        />
                                    </div>
                                ))}
                            </div>                        
                        }
                
                    </div>
                    {src &&  
                          <>
                            <div className={styles.endereco}>
                                                    
                            <div className={styles.data}>
                                <span>Request Date:</span>
                                <div>{src.data}</div>
                            </div>

                            <div className={styles.enderecoInfo}>
                                <span>Delivery address:</span>
                                <div > {session?.user.endereco}</div>
                            </div>

                            </div>


                            <div className={styles.precoInformations}>
                                <div className={styles.precoItem}>
                                    <span>Subtotal:</span>
                                    <div>R$ {src.subtotal} </div>
                                </div>
                                <div className={styles.precoItem}>
                                    <span>discount:</span>
                                    <div>(-10%)</div>
                                </div>
                                <div className={styles.precoItem}   >
                                    <span>Total:</span>
                                    <div>R$ {src.total}</div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    );
}










 




















export default Pedido;