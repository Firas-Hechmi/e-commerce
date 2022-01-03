let initialState={
    cart:[],
    commandsTotalPrice:0
}

const cartReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "INCR_QTE": {
            return {
               cart: state.cart.map(element=>{
                    if(element.product.id===action.playload.id){
                         return {
                             product:element.product,
                             totalPrice:element.totalPrice+element.product.price,
                             quantitee:element.quantitee+1
                         }
                    }else{
                        return element;
                    }
               }),
               commandsTotalPrice:state.commandsTotalPrice+action.playload.price
            }
        }
      
        case "DECR_QTE": {
            return {
               cart: state.cart.map(element=>{
                    if(element.product.id===action.playload.id){
                         return {
                             product:element.product,
                             totalPrice:element.totalPrice-element.product.price,
                             quantitee:element.quantitee-1
                         }
                    }else{
                        return element;
                    }
               }),
               commandsTotalPrice:state.commandsTotalPrice-action.playload.price
            }
        }

        case "REMOVE_ARTICLE_FROM_CART":{
            return {
                cart: state.cart.filter(element=>element.product.id!==action.playload.id),
                commandsTotalPrice:state.commandsTotalPrice-action.playload.totalPrice
            }
        }

        case "ADD_ARTICLE_TO_CART":{
            return {
                cart:[...state.cart,action.playload],
                commandsTotalPrice:state.commandsTotalPrice+action.playload['product'].price
            }
        }
        case "REMOVE_ALL_ARTICLES_FROM_CART":{
            return{
                cart:[],
                commandsTotalPrice:0
            }
        }
        default :
            return state;
    }
}

export default cartReducer;