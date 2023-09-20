import { ProdutoType } from "./ProdutoType";

export type ProductsType = {
    error: string | null;
    result: Okk
      
}

 
 

export type Okk = {
    page: number
    pages: number;
    data: ProdutoType[];
   
}
