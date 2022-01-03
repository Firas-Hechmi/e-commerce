let initialState={
    title:"Découvrez tous nos produits",
    search:false,
    products :[],
}

const productReducer=(state=initialState,action)=>{
    switch (action.type) {
       
        case "SET_PRODUCTS":{
            return{
                ...state,
                products:[...action.playload]
            }
        }
        case "NEW_TITLE":{
            return{
                ...state,
                title:action.playload
                
            }
        }
        case "DELETE_PRODUCT":{
            return {
                ...state,
                products:state.products.filter(product=>product.id!==action.playload)
            }
        }
        case "SEARCH":{
            return {
                products:[],
                title:"",
                search:action.playload
            }
        }
 
        default :
            return state;
    }
}

export default productReducer;