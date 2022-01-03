import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Media,
  Alert,

} from "reactstrap";

import Header from "components/Header.js";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { incrementQte } from "redux/actions/cart-actions.js";
import { decrementQte } from "redux/actions/cart-actions.js";
import { removeArticleFromCart } from "redux/actions/cart-actions.js";
import axios from "axios";
import { removeAllArticlesFromCart } from "redux/actions/cart-actions.js";
import { useState } from "react";
import { useHistory } from "react-router";
import { FaBell } from "react-icons/fa";

const Cart = () => {
  const cart=useSelector(state=>state.cartReducer.cart);
  const commandsTotalPrice=useSelector(state=>state.cartReducer.commandsTotalPrice);
  const dispatch=useDispatch();
  const history=useHistory();
  const [error,setError]=useState({
    exist:false,
    msg:""
  })

  const [success,setSucces]=useState({
    exist:false,
    msg:""
  });
  

  const command=()=>{
    let commands=[];
    cart.map(element=>{
      commands.push({
        "productname":element.product.name,
        "quantity":element.quantitee
      })
    })
     
    axios.post("http://localhost:8080/api/commands",

    {
      "username":localStorage.getItem("username"),
      "commandLineRequestList":commands
     }
    , { headers: {
     Authorization: "Bearer " + localStorage.getItem("accessToken")
     }      
   }
   ).then(
    response=>{
      dispatch(removeAllArticlesFromCart())
      setError({
        exist:false,
        msg:""
      })
      setSucces({
        exist:true,
        msg:response.data.message
      });
      setTimeout(()=>history.push("/admin/commands"),5000);
    }
   ).catch(error=>{
    setError({
      exist:true,
       msg:"Commande a échouée !!"
     });

  }
   )

 

  }
  return (
    <>
      <Header />
 
      <Container  fluid>
    
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                
                <button className="btn bg-default text-white">
              
                <RiShoppingCart2Fill style={{fontSize:"2rem"}}  /> 
                Panier
               </button>
              </CardHeader>
             
              {error.exist ?
                   <Alert color="danger" className="text-center">
                     <span className="alert-inner--icon">
                          <FaBell/>
                    </span>{" "}
                     <span className="alert-inner--text">
                         <strong>{error.msg}</strong>
                     </span>
                </Alert> 
            : null}
            {success.exist ?
               <Alert color="success" className="text-center">
               <strong>{success.msg}</strong> 
             </Alert>
             : null}

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Article</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Prix total</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                 {
                   cart.map(article=>(
                     
                    <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                  
                      <img  className=" avatar-lg mr-3" alt="..."
                                  src={
                             require("assets/img/products/"+article.product.image)
                                     .default
                                     }
                             
                               />
    
                        <Media>
                          <span className="mb-0 text-sm">
                          {article.product.name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>   {article.product.price} $</td>
                    <td>
                    {article.quantitee}
                     <div className="btn-group btn-group-sm ml-2">
                       <button className="btn btn-round btn-info" 
                          onClick={()=>dispatch(decrementQte(
                            {
                              id : article.product.id,
                              price :  article.product.price
                            }
                          ))}
                       >-</button>
                       <button className="btn btn-round btn-info" 
                          onClick={()=>dispatch(incrementQte({
                            id : article.product.id,
                            price :  article.product.price
                          }))}
                       >+</button>
                     </div>
                    </td>
                    <td>
                    {article.totalPrice.toFixed(2)} $
                    </td>
                    <td>
                    <button type="button"  className="btn btn-sm btn-danger btn-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" data-container="body" data-animation="true"
                     onClick={()=>dispatch(removeArticleFromCart(
                       {id : article.product.id,
                        totalPrice: article.totalPrice
                    }))}
                    >X</button>
                    </td>
                  </tr>
                        

                   ))
                 }
              
                  
                </tbody>
              </Table>
              <CardFooter className="py-4" >
              {
                cart.length>0 ?
                < >
                <h4>Prix total : {commandsTotalPrice.toFixed(2)}  $</h4>
                <div style={{textAlign:"center"}}>
                  
                <button type="button" 
                 onClick={()=>command()}
                class="btn btn-success">Commander</button>
                  </div> 
                  </>
                  : null
              }
            
            </CardFooter>
        
            </Card>
          </div>
        </Row>
       
      </Container>
    </>
  );
};

export default Cart;
