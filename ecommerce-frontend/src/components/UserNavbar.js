
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { RiFileEditFill, RiFileHistoryFill, RiLoginBoxFill, RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { deconnexion } from "redux/actions/auth-actions.js";
import { useHistory } from "react-router";
import { removeAllArticlesFromCart } from "redux/actions/cart-actions.js";
import { useState } from "react";
import { setProducts } from "redux/actions/product-actions";
import { setTitle } from "redux/actions/product-actions";
import { searchProducts } from "redux/actions/product-actions";
import axios from "axios";

const UserNavbar = (props) => {
  const isLogged=useSelector(state=>state.authReducer.isLogged);
  const isAdmin=useSelector(state=>state.authReducer.isAdmin);
  const [keyWord,setKeyWord]=useState("");
  const dispatch = useDispatch();
  const history=useHistory();
  const onDeconnexion=()=>{
      dispatch(removeAllArticlesFromCart());
      dispatch(deconnexion());
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      history.push("/admin/index");
      
  }
  const search=()=>{
       dispatch(searchProducts(true));
       axios.get(" http://localhost:8080/api/products/search/"+keyWord).then(
        response=>setTimeout(()=>{
            dispatch(searchProducts(false));
            dispatch(setProducts(response.data));
        },4000)
      ).catch(error=>{
        setTimeout(()=>dispatch(searchProducts(false)),4000)
         
       }
      )
  }
  const user=()=>{
    if(isLogged && isAdmin){
      return "ADMIN";
    }
    if(isLogged && !isAdmin){
      return "CLIENT";
    }
    return "UNKNOWN";
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
           
          </Link>
          <Form role="form"
          className="navbar-search navbar-search-dark form-inline  d-none d-md-flex ml-lg-auto mr-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative"> 
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
               <FaSearch className="fas fa-search" onClick={search} type="button" /> 
       
                  </InputGroupText>
                </InputGroupAddon>
                
                <Input placeholder="Trouver un produit..." type="text" value={keyWord} onChange={e=>setKeyWord(e.target.value)} />
              </InputGroup>
            </FormGroup>
          </Form>
        
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle bg-primary">
                   <FaUserAlt/>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                     {localStorage.getItem("username")}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
         
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bienvenue </h6>
                </DropdownItem>
                { user()==="CLIENT" ?
                <>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mon profile</span>
                </DropdownItem>
               
              
                <DropdownItem to="/admin/cart" tag={Link}>
                <RiShoppingCart2Fill className="ni ni-single-02" /> 
                
                  <span>Mon panier</span>
                </DropdownItem>

                <DropdownItem to="/admin/commands" tag={Link}>
                <RiFileHistoryFill className="ni ni-single-02" /> 
                
                  <span>Mes commandes</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem  onClick={() =>onDeconnexion()}>
                  <i className="ni ni-user-run" />
                  <span>Deconnexion</span>
                </DropdownItem>
                </>
                 :null}
                 {user()==="UNKNOWN" ?
                 <>
                  <DropdownItem to="/auth/login" tag={Link}>
                <RiLoginBoxFill className="ni ni-single-02" /> 
                
                  <span>Connexion</span>
                </DropdownItem>
                <DropdownItem to="/auth/register" tag={Link}>
                <RiFileEditFill className="ni ni-single-02" /> 
                
                  <span>Inscription</span>
                </DropdownItem>
                   </>
                   : null}
                   {user()==="ADMIN" ?
                    <>
                      <DropdownItem divider />
                      <DropdownItem  onClick={() =>onDeconnexion()}>
                        <i className="ni ni-user-run" />
                        <span>Deconnexion</span>
                      </DropdownItem>
                    </>
                  : null}
  
              </DropdownMenu>
             
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
