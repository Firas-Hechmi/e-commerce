let initialState={
    isLogged: localStorage.getItem('accessToken') ? true : false,
    isAdmin:false
}

const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "LOGIN":{
            return{
                ...state,
                isLogged:action.playload
            }
        }
        case "DECONNEXION":{
            return{
                isLogged:action.playload,
                isAdmin:action.playload
            }
        }
        case "ADMIN":{
            return{
              ...state,
              isAdmin:action.playload
            }
        }
        default :
            return state;
    }
}

export default authReducer;