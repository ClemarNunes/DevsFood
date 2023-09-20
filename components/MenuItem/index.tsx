import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from './MenuItem.module.css'
import { useRouter,  } from "next/router";



 type Props = {
   icon: StaticImageData; //funcionou
   link: string;
 }
 
export default ({ icon, link }: Props) => {
    const router = useRouter();
    let isActive = router.pathname == link;

    const handleLinkClick =  ( event: React.MouseEvent ) => { //React.MouseEvent funcionou
        event.preventDefault()
        router.push(link)
    }

    return(
    
        <div className={styles.manuIcons} onClick={handleLinkClick}   style={{ backgroundColor: (isActive ? '#000' : 'transparent') }} >
             <a href={link} >
                 <Image src={icon} width={300} height={300}  />
             </a> 
        </div>
    );
};