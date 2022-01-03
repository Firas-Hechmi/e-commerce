const incrementQte=(qteAndId)=>{
    return {
        type:"INCR_QTE",
        playload:qteAndId
    }
}

const decrementQte=(qteAndId)=>{
    return {
        type:"DECR_QTE",
        playload:qteAndId
    }
}

const removeArticleFromCart=(id)=>{
      return {
        type:"REMOVE_ARTICLE_FROM_CART",
        playload:id
      }
}

const removeAllArticlesFromCart=()=>{
    return {
      type:"REMOVE_ALL_ARTICLES_FROM_CART",
      playload:""
    }
}

const addArticleToCart=(newArticleInCart)=>{
    return {
        type :"ADD_ARTICLE_TO_CART",
        playload :newArticleInCart
        
    }
}

export {incrementQte,decrementQte,
        removeArticleFromCart,addArticleToCart,
        removeAllArticlesFromCart};