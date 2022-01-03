
import Header from "components/Header";

import {  useDispatch, useSelector } from "react-redux";


import {
  Container,

} from "reactstrap";

import Loader from "react-js-loader";
import ProductCard from "./product/ProductCard";
import UpdateCreateProduct from "shop/admin/UpdateCreateProduct";
import { useEffect } from "react";
import { admin } from "redux/actions/auth-actions";

const Index = (props) => {
   
  const products=useSelector(state=>state.productReducer.products);
  const title=useSelector(state=>state.productReducer.title);
  const search=useSelector(state=>state.productReducer.search);
  const isAdmin=useSelector(state=>state.authReducer.isAdmin);
  const dispatch=useDispatch();
  const existAdmin=()=>{
    if(localStorage.getItem("roles")){
      if(localStorage.getItem("roles").includes('ROLE_ADMIN')){
       dispatch(admin());
      }
    }
    return false;
  }
  useEffect(()=>existAdmin(),[]);

  return (
    
    <>
      <Header/>
     <Container className="mt-2">
      <div className="mb-4">
      <h2 className="text-default text-center mt-4 mb-1">{title}</h2>
      {isAdmin ?
          <UpdateCreateProduct type="add" id="" nameValue=""
          descriptionValue="" priceValue="" imageValue=""
          categoryNameValue="----------"
          />
      : null}
     
        </div>
      { search ?
         <>
            <Loader type="hourglass" bgColor={"#172b4d"} size={100}/>
            <h3 className="text-default text-center">Recherche...</h3>
         </> :
            products.length===0 ? <p className="text-center text-danger">Produits introuvables !!</p> : 
         
            products.map(product=>(
              <ProductCard key={product.id} id={product.id} name={product.name}
               description={product.description} price={product.price} image={product.image} 
               category={product.category}
   
               />
            ))
            
         }
  
       
  
     </Container>
      
    </>
  );
};

export default Index;
