import { ReactElement } from 'react';
import styles from './Layout.module.css'
import MenuItem from '../../components/MenuItem'
import MenuImage1 from '../../public/assets/store.png'
import MenuImage2 from '../../public/assets/order.png'
import MenuImage3 from '../../public/assets/profile.png'



type Props = {
    children: ReactElement;
}

export const Layout = ({ children }: Props) => {

    return(
     
        <div className={styles.Container}>

            <div className={styles.menu}>
                <MenuItem icon={MenuImage1} link='/'/>
                <MenuItem icon={MenuImage2} link='/AreaPedidos'/>
                <MenuItem icon={MenuImage3} link='/Login'/>
            </div>

            <div className={styles.PageBody}>
                <div className={styles.sombra}>
                    {children}
                </div>
            </div>
            
        </div>
       
    );
}