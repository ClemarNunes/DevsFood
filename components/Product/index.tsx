import styles from './products.module.css'
import Image from 'next/image'
import { ModalInformations } from '../../types/ModalInformations'


type Props = { 
    data: ModalInformations;
    onClick: (data: ModalInformations  ) => void
}
 
 

export default ({ data, onClick }: Props) => {

    const handleClick = () => {
        onClick(data)
        
         
        
    }
    
    return(
        <div className={styles.Container} onClick={handleClick}>

            <div className={styles.productImage}>
                <img src={data.image} alt="" width={180} height={120} />
                
            </div>

            <div className={styles.productsInfoArea}>

                <div className={styles.info}>
                    <div className={styles.title}>{data.name} </div>
                    <div className={styles.price}>R${data.price} </div>
                    <div className={styles.description}>{data.ingredients}</div>
                </div>

                <div className={styles.nextImage}>
                    <Image src={'/assets/next.png'} width={30} height={30} />
                </div>

            </div>
        </div>
    );
}

