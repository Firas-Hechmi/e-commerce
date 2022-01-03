import React, {useState} from "react";
import {AiFillDelete} from "react-icons/ai";
import {TiWarning} from "react-icons/ti";
import axios from "axios";

import {Button, Modal} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "redux/actions/category-actions";
import { deleteProduct } from "redux/actions/product-actions";


function DeleteProductCategory({type,id,name,accueil}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch=useDispatch();
    const title=useSelector(state=>state.productReducer.title);
    
    const refresh=()=>{
         if(type==="categories"){
             dispatch(deleteCategory(id));
             if(title===name){
                accueil();
             }
         }else if(type==="products"){
             dispatch(deleteProduct(id));
         }
    }
    const remove=()=>{
         axios.delete("http://localhost:8080/api/"+type+"/"+id.toString(), { headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
            }      
          }
          ).then(response=>{
              setModalOpen(!modalOpen);
              refresh();
            }
           )
    }


    return (
        <>
        <button className="btn bg-danger btn-sm ml-2" onClick={() => setModalOpen(!modalOpen)} >  
        <AiFillDelete style={{fontSize:"1rem"}} fill="white" />
        </button>
            <Modal
                 className="modal-dialog-centered modal-danger"
                 contentClassName="bg-
                 "
                toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}
            >
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body" >
                    <div className="py-3 text-center">
                        <TiWarning className="ni ni-bell-55 ni-4x" fill="white" />
                        <h4 className="heading mt-4">Confirmez-vous la suppression
                         {type==="products"? " du produit " : null}
                         {type==="categories"? " du catégorie " : null}
                         "{name}"
                         </h4>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button
                        className="ml-auto btn-white"
                        color="default"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}>
                        Annuler
                    </Button>
                    <Button className="btn-white"
                            color="default"
                            type="button"
                            onClick={()=>remove()}
                         >
                        Confirmer
                    </Button>
                </div>

            </Modal>

        </>
    );
}

export default DeleteProductCategory;
