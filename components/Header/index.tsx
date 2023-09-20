import React, { ChangeEvent, useState } from "react";
import styles from './Header.module.css'
import Image from "next/image";
import Logo from '../../public/assets/logo.png'

type Props = {
    search: string;
    onSearch: (search: string) => void
}
 

export default ({search, onSearch}: Props) => {
    const [inputActive, setInputActive] = useState(false);


    const handleInputFocus = () => {
        setInputActive(true)
    }

    const handleInputBlur = () => {
        if(search === ''){
            setInputActive(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch( e.target.value )
    }

    return (
        <div className={styles.Container}>
            <Image src={Logo} width={260} height={70} />

            <input
                type="text" 
                placeholder="Enter a product" 
                className={styles.input} 
                value={search}
                onChange={handleChange}
                style={{width: (inputActive ? 300 : 0)}}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </div>
    )
}