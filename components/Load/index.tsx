// import { useEffect, useState } from 'react';
import styles from './Load.module.css';
import { motion } from 'framer-motion'

type Props = {
    value: number
}
 

const Load = ({ value }: Props ) => {
    return(
        <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
                <motion.div className={styles.bar} animate={{width: `${value}`}} transition={{ duration: '2'}} />
            </div>
        </div>
    );
}


export default Load;