import styles from './OutrosPedidos.module.css'
 

type Props = {
    src: string[];
    name: string[];
    data: string;
    sub: string;
    total: string;
}

 
const OutrosPedidos = ({ src, name, data, sub, total }: Props) => {
    return(
       
        <div className={styles.Container}>
           <div className={styles.itemArea}>
          
                {src.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <img src={item} width={70} height={'auto'} alt="" />
                        <span>{name[index]}</span>
                    </div>
                ))}
               
            </div>  

            <div className={styles.infoArea}>
                <div className={styles.infoItemData} >
                    <span>Data:</span>
                    <div>{data}</div>
                </div>

                <div className={styles.infoItem}>
                    <span>Subtotal:</span>
                    <div>R$ {parseInt(sub).toFixed(2)}</div>
                </div>

                <div className={styles.infoItem}>
                    <span>Total:</span>
                    <div>R$ {total}</div>
                </div>
            </div>
        </div>
       
    );
}

export default OutrosPedidos