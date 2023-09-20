import { signIn, signOut, useSession } from "next-auth/react";
import Cart from '../components/Cart'
import styles from './styles.module.css'
import Header from "../components/Header";
import { useEffect, useState } from "react";
import apiCate from "../libs/apiCate";
import Category from '../components/Category'
import  Product from '../components/Product' 
import  Modal from '../components/Modal'
import ModalProduct from "../components/ModalProduct";

import { ProductsType } from "../types/productsType";
import { CategoryType } from '../types/CategoryType'
import { CategoriaType } from "../types/CategoriaType";
import { ProdutoType } from "../types/ProdutoType";
import { ModalInformations } from "../types/ModalInformations";
import { imageCategory } from "../helper";

type Props = {
  res: CategoryType; 
}


let searchTimer:any = null;

const App = ({ res }: Props ) => {
  const [headerSearch, setHeaderSearch] = useState('');
  const [categoria, setCategoria] = useState<CategoriaType[]>(res.result);
  const [Products, setProducts] = useState<ProdutoType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [activeSearch, setActiveSearch] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState<ModalInformations>({id:'', name:'', image:'', price:0, ingredients:''});

  const { data: session }  = useSession();

 
  const GetProducts = async () => {
  const res: ProductsType = await apiCate.getProducts(activeCategory, activePage, activeSearch);
    if(res.error == ''){
      setProducts(res.result.data);
      setTotalPages(res.result.pages)
      setActivePage(res.result.page)
    }
  };

  useEffect(() => {
    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {

      setActiveSearch(headerSearch);
        
    },2000); 
  },[headerSearch]);

   
  useEffect(() => {
    setProducts([]);
    GetProducts();
  },[ totalPages, activeSearch, activeCategory]);
  
 
  const handleProductClick = (data: ModalInformations) => {
    
    setModalData(data);
    setModalStatus(true);
     
  }


  return(
 

    <div className={styles.Container}>
      <Header search={headerSearch}  onSearch={setHeaderSearch} />

      {session && 
        <>
          <div className={styles.usuario}>
            
            <div >Hello {session.user?.name}.</div>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        
        </>
      }

     
      <div className={styles.containerProducts}>

        <div className={styles.CategoryArea}>
          <div className={styles.titulo}> <h3>Select a category</h3> </div>

          <div className={styles.areaCategoria}>
            <Category src='/assets/categories/food-and-restaurant2.png' id={0} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            {categoria.map((item, index) => (
              <Category key={index} src={imageCategory[index].url} id={parseInt(item.id)} activeCategory={activeCategory}  setActiveCategory={setActiveCategory}  />
            ))}
          </div>
       </div>

        <div className={styles.ItensCategoria}>
       
          {Products.map((item, index) => (
            <div key={index}  className={styles.produtosArea} >

              <Product data={item} onClick={handleProductClick} />  
              
            </div>
          ))}
          
        </div>  

      <div className={styles.ProductsPaginationArea} >
        {Array(1).fill(0).map((item, index) => (
          <div className={styles.productPaginationItem} key={index}  onClick={() => setActivePage(index+1)} style={{backgroundColor: (activePage === (index+1) ? '#CCC': '#FFF')  }} >
            {index + 1}
          </div>
        ))}
      </div>   

    </div>  


      <Cart />


      <div>

        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
           <ModalProduct  data={modalData} setModalStatus={setModalStatus}  />
        </Modal>

      </div>      


    </div>  
    
  );

}



export const getStaticProps = async () => {
 
  const res: CategoryType = await apiCate.getCategory();
 
  return {
    props: {
      res,
      
    }
  }
}


 



export default App



 
 