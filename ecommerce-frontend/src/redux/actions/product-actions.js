const setProducts=(products)=>{
    return{
        type:"SET_PRODUCTS",
        playload:products
    }
}

const setTitle=(title)=>{
    return{
        type:"NEW_TITLE",
        playload:title
    }
}
const deleteProduct=(id)=>{
    return{
        type:"DELETE_PRODUCT",
        playload:id
    }
}
const searchProducts=(search)=>{
    return{
        type:"SEARCH",
        playload:search
    }
}
export {setProducts,setTitle,deleteProduct,searchProducts};