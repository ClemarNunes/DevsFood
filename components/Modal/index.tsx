import React from 'react';
import styles from './Modal.module.css'


type Props = {
    modalStatus: boolean;
    setModalStatus: (setModalStatus: boolean) => void;
    children:  React.ReactNode;
}

export default ({ modalStatus, children, setModalStatus }: Props ) => {

    const handleModalClick = (e: React.MouseEvent  ) => {
       
        const elemento = e.target as HTMLElement
        if(elemento.classList.contains('Modal_Container___kYqL')){
            setModalStatus(false)
            
        }      
    }


    return (
        <div className={styles.Container} onClick={handleModalClick} style={{ display: (modalStatus ? 'flex': 'none') }} >
            <div className={styles.ModalBody} >
                {children}
            </div>
        </div>
    );
}