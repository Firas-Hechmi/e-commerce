let initialState={
    categories:[],
}

const categoryReducer=(state=initialState,action)=>{
    switch (action.type) {
       
        case "SET_CATEGORIES":{
            return{
                categories:[...action.playload]
            }
        }
        case "DELETE_CATEGORY":{
            return{
                categories:state.categories.filter(category=>category.id!==action.playload)
            }
        }
        default :
            return state;
    }
}

export default categoryReducer;