const setCategories=(categories)=>{
    return{
        type:"SET_CATEGORIES",
        playload:categories
    }
}

const deleteCategory=(id)=>{
    return{
        type:"DELETE_CATEGORY",
        playload:id
    }

}

export {setCategories,deleteCategory};