const login=()=>{
    return {
        type:"LOGIN",
        playload:true
    }
}
const admin=()=>{
    return {
        type:"ADMIN",
        playload:true
    }
}
const deconnexion=()=>{
    return {
        type:"DECONNEXION",
        playload:false
    }
}

export {login,admin,deconnexion};