import React, {useState} from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {Alert, Modal} from "reactstrap";
import { addArticleToCart } from "redux/actions/cart-actions.js";

function ProductAddToCart({id,name,description,price,image,category}) {
    const [modalOpen, setModalOpen] =useState(false);
    const isLogged=useSelector(state=>state.authReducer.isLogged);
    const history=useHistory();
    const  dispatch =useDispatch();
    const [msg,setMsg]=useState("l'article a été ajouté à votre panier !!");
    const [style,setStyle]=useState("success");
    const cart=useSelector(state=>state.cartReducer.cart);
    const onAddToCart=()=>{
      if(isLogged){
        let alreadyExist=false;
        let i=0;
        while(!alreadyExist && i<cart.length){
            if(cart[i].product.id===id){
                alreadyExist=true;
            }else{
                i++;
            }
        }
        if(!alreadyExist){
         dispatch(addArticleToCart(
            {
              product:{
                id:id,
                name:name,
                description:description,
                image : image,
                price:price,
                category:category
               },
               totalPrice:price,
               quantitee:1
            }
         ))
        }else{
            setStyle("info");
            setMsg("l'article existe déjà dans votre panier !!");
        }
        setModalOpen(!modalOpen);
      }else{
          history.push("/auth/login");
        
      }
    }
     
    return (
        <> 
      
        <button className="btn bg-primary btn-sm" onClick={() => onAddToCart()}> <RiShoppingCart2Fill fill="white"/>  </button>
            <Modal
                className="modal-dialog-centered"
                size="sm"
                toggle={() => setModalOpen(!modalOpen)}
                isOpen={modalOpen}>
                       <Alert color={style} className="mb-0">
          <strong>{msg}</strong>
        </Alert>
             
            </Modal>
        </>
    );
}

export default ProductAddToCart;
