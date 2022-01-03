import React from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import DeleteProductCategory from "shop/admin/DeleteProductCategory";
import UpdateCreateProduct from "shop/admin/UpdateCreateProduct";
import ProductAddToCart from "./ProductAddToCart";
import ProductInfo from "./ProductInfo";



function ProductCard({id,name,description,price,image,category}) {

  const isAdmin=useSelector(state=>state.authReducer.isAdmin);

  return (
    <>
      <Card style={{width:"12rem"}} className="ml-4 mb-4 d-lg-inline-block">

        <CardImg         
         alt="..."
         src={
           require("assets/img/products/"+image)
             .default
          }
          top
        ></CardImg>
        <CardBody style={{padding:"10px"}}>
          <CardTitle className="text-center mb-1" >{name}</CardTitle>
           <CardText  className="text-center mb-1">{price} $</CardText>
         {isAdmin ?  
           <div className="text-center">    
          <DeleteProductCategory type="products" id={id} name={name}/>
          <UpdateCreateProduct type="edit" id={id} nameValue={name} descriptionValue={description} priceValue={price} imageValue={image}
          categoryNameValue={category.name}
          />
           </div>
         
         :
         <div className="text-center">    
         <ProductInfo id={id} name={name} description={description} price={price} image={image} category={category}/>
         <ProductAddToCart id={id} name={name} description={description} price={price} image={image} category={category}/>
           </div> 
         }
       
        
           
        
         
        </CardBody>
      </Card>
    </>
  );
}

export default ProductCard;