import styles from './Category.module.css';

type Props = {
    id: number;
    src: string
    activeCategory: number;
    setActiveCategory: (id: number) => void;
     
}

export default ({ src, id, activeCategory,setActiveCategory }: Props) => {

    const handleClick = () => {
        setActiveCategory(id)
    
    }
   
   return(
    <div onClick={handleClick} className={styles.Container} style={{backgroundColor: (activeCategory === id ? '#BDB76B': '#FFF')}} > 
        <img src={src}     alt="" width={55} height={55}  />  
    </div>
   )

 
}

