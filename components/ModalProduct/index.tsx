import { useState, useEffect } from 'react';
import styles from './ModalProduct.module.css'
import { ModalInformations } from '../../types/ModalInformations';
import { InformationData } from '../../types/InformationData'

import { useDispatch } from 'react-redux';
 
 
type Data = {
    data: ModalInformations;
    setModalStatus: (setModalStatus: boolean) => void;
}


export default ({ data, setModalStatus  }: Data) => {
   
    const dispatch = useDispatch();
    const [qt, setQt] = useState<number>(1);
 

    useEffect(() => {
        setQt(1)
    }, [data])

    const handleCancelButton = () => {
        setModalStatus(false)
    }

     
    const handleMinusQt = () => {
        if(qt > 1){
            setQt(qt - 1);
        }
    }

    const handlePlusQt = () => {
        setQt(qt + 1)
    }


    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: {data, qt}
        })
        setModalStatus(false)
    }
     
    return(

        <div className={styles.Container}>
            <div className={styles.ProductArea}>

                <img src={data.image} alt=""  />

                <div className={styles.ProductInfoArea}>
                    <div className={styles.ProductDetails}>
                            <div className={styles.productName}>{data.name}</div>
                            <div className={styles.productIgredients}>{data.ingredients}</div>
                    </div>
                    <div className={styles.ProductQuantityArea}>
                        <div className={styles.productQuantity}>
                            <img onClick={handleMinusQt} src={'/assets/categories/minus.png'} alt=""  />
                            <div  className={styles.productQtText}>{qt}</div>
                            <img onClick={handlePlusQt} src='/assets/categories/plus.png' alt=""/>
                        </div>
                        <div className={styles.productPrice}>R${((data.price)  * qt).toFixed(2)} </div>
                         
                    </div>

                </div>
            </div>

            <div className={styles.ProductButtons}  >
                 
               
                
                <button className={styles.ButtonCancel} style={{fontSize: '13px', padding: '10px'}} onClick={handleCancelButton}>
                    Cancel
                </button>
                <button  onClick={handleAddToCart} >Add to basket </button>  
            </div>
        </div>
    );
}