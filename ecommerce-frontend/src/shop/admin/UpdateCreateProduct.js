import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { setProducts,setTitle } from "redux/actions/product-actions.js";
import Loader from "react-js-loader";
import axios from "axios";
import { Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal} from "reactstrap";
import { FaBell } from "react-icons/fa";


function UpdateCreateProduct({type,id,nameValue,descriptionValue,priceValue,imageValue,categoryNameValue}) {
   
    const categories=useSelector(state=>state.categoryReducer.categories);
    const products=useSelector(state=>state.productReducer.products);
     
    const [modalOpen, setModalOpen] = React.useState(false);
    const [name,setName]=useState(nameValue);
    const [description,setDescription]=useState(descriptionValue);
    const [price,setPrice]=useState(priceValue);
    const [image,setImage]=useState(imageValue);
    const [categoryName,setCategoryName]=useState(categoryNameValue);
    const [launchloader, setLaunchLoader] = useState(false);
    const [succes, setSucces] = useState({
        flag: false,
        msg: ''
    });
    const [error, setError] = useState({
        flag: false,
        msg: ''
    })
    const dispatch = useDispatch();
    const history=useHistory();
    const getNewProductsByCateogryName=()=>{
        let i=0;
        let search=false;
        let id=-1;
        while(i<categories.length && !search){
            if(categories[i].name===categoryName){
               id=categories[i].id;
               search=true;
            }else{
                i++;
            }
        }
        axios.get(" http://localhost:8080/api/products/category?category_id="+id.toString()).then(
            response=>{
              dispatch(setProducts(response.data));
              dispatch(setTitle(categoryName));
              history.push('/admin/index')
            }
          )
    }

  
    const close = () => {
        setSucces({
            flag: false,
            msg: ''
        });
        setError({
            flag: false,
            msg: ''
        })
        if (type === 'add') {
           setName("");
           setDescription("");
           setImage("");
           setPrice("");
           setCategoryName("----------");

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < products.length) {
                if (products[i].id === id) {
                    setName(products[i].name);
                    setDescription(products[i].description);
                    setImage(products[i].image);
                    setPrice(products[i].price);
                    setCategoryName(products[i].category.name)
                    cancelUpdate = true;
                } else {
                    i++;
                }
            }
        }
        setModalOpen(!modalOpen)
    }
 
   
    const edit = (e) => {
        e.preventDefault();
        if (name === "" || price==="" || description==="" || image==="" ) {
            setSucces({
                flag: false,
                msg: ''
            });
            setError({
                flag: true,
                msg: 'Veuillez renseigner tous les champs !!'
            });
        } else {
            setError({
                flag: false,
                msg: ''
            });
            setSucces({
                flag: true,
                msg: ""
            });
            setLaunchLoader(true);
            axios.put("http://localhost:8080/api/product",{
                id:id,
                name:name,
                description:description,
                image:image,
                price:price,
                categoryName:categoryName
            }, { headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }      
              }
              ).then(
                response => {
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: response.data.message
                    });
                    setLaunchLoader(false);
                    getNewProductsByCateogryName();
                   
                }
            ).catch(
                error => {
                    setSucces({
                        flag: false,
                        msg: ''
                    });
                    setError({
                        flag: true,
                        msg: error.response.data.message
                    });

                    setLaunchLoader(false);
                }
            )
            }
       
    }
    const add = (e) => {
        e.preventDefault();
        if (name === "" || price==="" || description==="" || image==="") {
            setSucces({
                flag: false,
                msg: ''
            });
            setError({
                flag: true,
                msg: 'Veuillez renseigner tous les champs !!'
            });
        } else { 
           setError({
                flag: false,
                msg: ''
            });
            setSucces({
                flag: true,
                msg: ""
            });
            setLaunchLoader(true);
            axios.post("http://localhost:8080/api/product",{
                id:id,
                name:name,
                description:description,
                image:image,
                price:price,
                categoryName:categoryName
            }, { headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }      
              }
              ).then(
                response => {
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: response.data.message
                    });
                     setLaunchLoader(false);
                     getNewProductsByCateogryName();        
                     setTimeout(()=>close(),3000);         
                }
            ).catch(
                error => {
                    setSucces({
                        flag: false,
                        msg: ''
                    });
                    setError({
                        flag: true,
                        msg: error.response.data.message
                    });

                    setLaunchLoader(false);
                }
            )
            }
        } 

   
    return (
        <>
            {
                type === "add" ? <IoMdAddCircle type="button" className="text-success ni-2x ml--4"
                                                onClick={() => setModalOpen(!modalOpen)}/> : null
            }
            {
                type === "edit" ? 
                <button className="btn bg-orange btn-sm ml-2" onClick={() => setModalOpen(!modalOpen)} >  
                  <FiEdit fill="white"  style={{fontSize:"1rem"}}/> 
                </button>
              : null
            }
            <Modal
                className="modal-dialog-centered"
                size="sm"
                toggle={() => setModalOpen(!modalOpen)}
                isOpen={modalOpen}>
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-primary ">
                           
                            <div className="text-white text-center ">
                                    {type === "add" ? "Création d'un produit " : null}
                                    {type === "edit" ? "Modification d'un produit " : null}
                            
                            </div>
                        </CardHeader>
                        <CardBody>
                        {launchloader ? <Loader type="hourglass" bgColor={"#194682"} size={80}/> : null}
                        {error.flag ?
                   <Alert color="danger" className="text-center">
                     <span className="alert-inner--icon">
                          <FaBell/>
                    </span>{" "}
                     <span className="alert-inner--text">
                         <strong>{error.msg}</strong>
                     </span>
                </Alert> 
            : null}
                {succes.flag ?
               <Alert color="success" className="text-center">
               <strong>{succes.msg}</strong> 
             </Alert>
             : null}  
                          
                            <Form role="form"  onSubmit={type === 'edit' ? edit : add}
                                 >
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label>
                                            Nom :
                                        </label>
                                        <input
                                          value={name}
                                          onChange={(e)=>setName(e.target.value)}
                                          style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                           />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label >
                                            Description :
                                        </label>
                                        <textarea 
                                          value={description}
                                          onChange={e=>setDescription(e.target.value)}
                                          style={{
                                              width: '100%',
                                              height: '60px'
                                          }}
                                                 name="title">

                                        </textarea>
                                       
                                    </InputGroup>
                                </FormGroup>
                               
                                    <FormGroup>
                                        <InputGroup>
                                            <label>
                                              Prix :
                                            </label>
                                            <input
                                          
                                               value={price}
                                               onChange={e=>setPrice(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                              />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <label>
                                             Image :
                                            </label>
                                            <input
                                              value={image}
                                              onChange={e=>setImage(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                              />
                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup>
                                        <InputGroup>
                                            <label>
                                              Catégorie :
                                            </label>
                                            <select 
                                             style={{
                                                width: '100%',
                                                height: '35px'
                                            }}

                                            onChange={(e) => setCategoryName(e.target.value)}
                                            >
                            
                                                 <option className="text-primary" value={categoryName}>{categoryName}</option>
                                                {categories.map(category=>(
                                                    <option value={category.name}>{category.name}</option>
                                                ))}
                                               
                                            </select>
                                        </InputGroup>
                                    </FormGroup>
                                   

                                <div className="text-center">
                                    <Button
                                    
                                        color="primary"
                                        type="submit">
                                  {type === "add" ? "Créer " : null}
                                    {type === "edit" ? "Modifier " : null}
                                     
                                    </Button>
                                    <Button
                                    onClick={() => close()}
                                    color="danger"
                                    type="button">
                                  Fermer
                                </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    );
}

export default UpdateCreateProduct;
