// import { ResultItem } from "../types/ResultItem";


export type CategoryType = {
    error: string | null;
    result: ResultItem[]
  }


  export type ResultItem  = {
    id: string;
    name: string;
    image: any;
 
 }
  