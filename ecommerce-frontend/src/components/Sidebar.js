

import {

  Navbar,

  Container,
  NavbarBrand,
  ListGroup,
  ListGroupItem,
 
} from "reactstrap";
import {GiShop} from "react-icons/gi";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "redux/actions/product-actions.js";
import { setCategories } from "redux/actions/category-actions.js";
import { setTitle } from "redux/actions/product-actions.js";
import DeleteProductCategory from "shop/admin/DeleteProductCategory";
import UpdateCreateCategory from "shop/admin/UpdateCreateCategory";


const Sidebar = (props) => {
  const history=useHistory();
  const isAdmin=useSelector(state=>state.authReducer.isAdmin);
  const dispatch=useDispatch();
  const getCategories=()=>{
    axios.get(" http://localhost:8080/api/categories").then(
      response=>dispatch(setCategories(response.data))
    )
   
  }
  const getProductsByCategory=(id,categoryName)=>{
         axios.get(" http://localhost:8080/api/products/category?category_id="+id.toString()).then(
           response=>{
             dispatch(setProducts(response.data));
             dispatch(setTitle(categoryName));
             history.push('/admin/index')
           }
         )
  }
  const getProducts=()=>{
    dispatch(setTitle("Découvrez tous nos produits"));
    axios.get(" http://localhost:8080/api/products").then(
      response=>dispatch(setProducts(response.data))
    )
  }
 
  useEffect(()=>getCategories(),[]);
   
  const categories=useSelector(state=>state.categoryReducer.categories);

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >

      <Container fluid>
      <NavbarBrand className="pt-0 mb-2">
        <NavLink to="/index">
           <GiShop className="text-default" onClick={()=>getProducts()} style={{fontSize:"4rem"}}  /> 
        </NavLink>
       
        </NavbarBrand>
        {isAdmin ? 
          <UpdateCreateCategory type="add" id="" nameValue="" getCategories={getCategories} />
        : null}          
        <ListGroup>
          {categories.map(categorie=>(
                <ListGroupItem key={categorie.id} className="text-white bg-default"
                ><p  type="button" className="mb-0" onClick={()=>getProductsByCategory(categorie.id,categorie.name)}>{categorie.name} </p>
    
               {isAdmin ?
                
                <div className="text-center mt-1">
               <DeleteProductCategory type="categories" id={categorie.id} name={categorie.name}  accueil={getProducts}/>
           <UpdateCreateCategory type="edit" id={categorie.id} nameValue={categorie.name}  getCategories={getCategories} />
           </div> : null}
            
                </ListGroupItem>
          ))}
        </ListGroup>
        
      </Container>
     
    </Navbar>
  );
};



export default Sidebar;
