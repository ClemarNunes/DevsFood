import styles from './image.module.css'


type Props = {
    src: string;
    name: string;
    quant: string;
    ing: string;
}


const Image = ({ src, name, quant, ing }: Props) => {
     
     
    return(
        <div className={styles.Container} >
            <div className={styles.ItemArea}>
           
                <img src={src} width={120} height={'auto'} alt="" />

                <div className={styles.informationsArea}>
                    <div className={styles.ProductName}>
                        {name}
                    </div>

                    <div className={styles.ingredients}>
                        {ing}
                    </div>

                    <div className={styles.quantidade}>
                        Quantity: {quant}
                    </div>

                </div>
       
            </div>
        
        </div>
    );
}

export default Image