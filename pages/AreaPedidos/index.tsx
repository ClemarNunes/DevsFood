import { GetServerSideProps } from "next";
import api from "../../libs/api";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Pedido from '../../components/Pedido'
import styles from './AreaPedidos.module.css'
import apiInformation from "../../libs/apiInformation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OutrosPedidos from "../../components/OutrosPedidos";
import Animation from '../../components/Animation'
import PageAnimation from "../../components/PageAnimation";
import { ProductInformations } from '../../types/ProductInformations'
import { UserInformations } from '../../types/UserInformations'


type Props = {
    users: UserProp;
    info: UserInformations[]
}


type UserProp = {
    id: number;
    name: string;
    email: string;
}

 let abas = 0
 

const AreaPedidos = ({ users, info  }: Props) => {
    const pedidosPorPagina = 3;
     

    const [informacoes, setInformacoes] = useState<ProductInformations[]>([]);
    const [auxiliarUltimo, setAuxiliarUltimo ] = useState<ProductInformations[]>([]);
    const [allInfo, setAllInfo] = useState<ProductInformations[]>([]);
    const [loading, setLoading] = useState(true);

    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setActivePage] = useState(0);
    const [filterInformation, setFilterInformation] = useState<ProductInformations[]>([]);
    const [carregar, setCarregar] = useState(true);
    const [buttonOff, setButtonOff] = useState(false);
   
 

    const {data: session} = useSession();

    const logado = () => {
       for(let i in info){
            if( session?.user.id == info[i].id){
                setAuxiliarUltimo(info[i].information);
                setAllInfo(info[i].information);   
                
            }
       }
       const  newArray = allInfo.slice(0, allInfo.length -1).reverse();
       setInformacoes(newArray);
       setTotalPages(newArray.length);
       abas = Math.ceil( (newArray.length) / 3);
    }
     
    

    let ultimo: ProductInformations = auxiliarUltimo[auxiliarUltimo.length - 1]
 
    useEffect(() => {
        logado();   
    }, [auxiliarUltimo,loading])


    useEffect(() => {
       
        const id = setInterval(() => {
            
            setLoading(false)
            
             
        }, 2000);
        return () => {
            
            clearInterval(id);    
        }
        
    }, [])
 
    
    const paginaLista2 = (informacoes: ProductInformations[], activePage:number, pedidosPorPagina:number ) => {
        const startIndex = (activePage - 1) * pedidosPorPagina; //0
        const endIndex = startIndex + pedidosPorPagina; // 0 + 3 = 3
        return informacoes.slice(startIndex, endIndex); //0 até 3
    }
   
    useEffect(() => {
        const paginaA =  paginaLista2(informacoes, activePage, pedidosPorPagina)
        setFilterInformation(paginaA)
    },[activePage])

    const teste = ( ) => {
        setCarregar(false)
        setActivePage(1)
        setButtonOff(true)
    }

    return (
        
        <div className={styles.Container} >
            <PageAnimation>
            <Pedido src={ultimo} info={allInfo.length} />
            </PageAnimation>

            {!loading && (allInfo.length > 1)  && 
                <div className={styles.carregarPedidos}>
                    <button onClick={teste} style={{display: (buttonOff == true ? 'none' : '')}}>Other requests</button>
                </div>
            }
            {!loading && !carregar &&
                <div className={styles.OutrosProdutos}>
                    <Animation>
                        
                    <div className={styles.outrosProdutosArea}>
                    
                        {filterInformation.map((item, index) => (
                            <div key={index} >
                                <OutrosPedidos 
                                    src={item.images} 
                                    name={item.names} 
                                    data={item.data}   
                                    sub={item.subtotal}
                                    total={item.total}
                                />
                            </div>
                        ))}

                    </div>
                    </Animation>
                        
                    {totalPages > 0 && 
                        
                        <div className={styles.paginationArea}>
                            
                            {Array(abas).fill(0).map((item, index) => (
                                <div key={index} className={styles.paginationItem}  onClick={() => setActivePage(index+1)} style={{backgroundColor: (activePage === (index+1) ? '#CCC': '#FFF')  }}>
                                    {index+ 1}
                                </div>
                            ))}
                        
                        </div>
                    }
               
                </div>    
            }            
        </div>
        
    )
   
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: '/Login',
                permanent: true
            }
        }
    }

    const users = await api.getAllUsers(0);
    const info = await apiInformation.GetInformation();

    return {
        props: {
            users,
            info
        }
    }
}



export default AreaPedidos