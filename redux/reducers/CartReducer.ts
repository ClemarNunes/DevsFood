import { DataInitialState } from "../../types/DataInitialState";
import { DataActionType } from "../../types/DataActionType";


type InitialStateType = {
  products: DataInitialState[]
}

type ActionType = {
  type: string;
  payload: DataActionType
}



export const initialState: InitialStateType = {
  products: []
};


export default (state = initialState, action: ActionType) => {
  let products= [...state.products];
    switch(action.type){
      case 'ADD_PRODUCT':

        let id = action.payload.data.id;
        console.log(action.payload.data)

        let index = products.findIndex(item => item.id === id);
        if(index > -1 ){
            products[index].qt += action.payload.qt;
        }else{
          products.push({
            ...action.payload.data,
            qt: action.payload.qt
          })
        }
          return {...state, products}
      break;
      
      case 'CHANGE_PRODUCT':
         
        if(products[action.payload.key]){
          switch(action.payload.type){
            case '-':
              products[action.payload.key].qt--;
              
              if(products[action.payload.key].qt <= 0){
                products = products.filter((item, index) => index != action.payload.key);
              }
            break;
            case '+':
              products[action.payload.key].qt++;
            break;
          }
       }

       return {...state, products}
      break;
    }
    return state;
}