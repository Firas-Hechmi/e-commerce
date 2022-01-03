import React, {useState} from "react";
import { FaSearchPlus } from "react-icons/fa";

import { Card, CardBody, CardImg, CardText, CardTitle, Modal} from "reactstrap";

import ProductAddToCart from "./ProductAddToCart";


function ProductInfo({id,name,description,price,image,category}) {
    const [modalOpen, setModalOpen] =useState(false);

     
    return (
        <> 
        <button className="btn bg-primary btn-sm"  onClick={() => setModalOpen(!modalOpen)}> <FaSearchPlus fill="white"/></button>  
            <Modal
                className="modal-dialog-centered"
                size="sm"
                toggle={() => setModalOpen(!modalOpen)}
                isOpen={modalOpen}>
                 <div className="modal-body p-0">
                <Card>
        <CardImg
          alt="..."
          src={
            require("assets/img/products/"+image)
              .default
           }
          top
        ></CardImg>
        <CardBody>
          <CardTitle className=" h2 mb-0">{name}</CardTitle>
          <small className=" text-muted">
          {price} $
          </small>
          <CardText className=" mt-4">
           {description}
          </CardText>
          <ProductAddToCart id={id} name={name} description={description} price={price} image={image} category={category}/><span className="text-primary">Ajouter au panier</span>
          
        </CardBody>
      </Card>
               </div>
            </Modal>
        </>
    );
}

export default ProductInfo;
