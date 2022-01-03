import React, { useEffect, useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal} from "reactstrap";
import { FaBell } from "react-icons/fa";
import axios from "axios";
function UpdateCreateCategory({type,id,nameValue,getCategories}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [name,setName]=useState(nameValue);
    const [launchloader, setLaunchLoader] = useState(false);
    const [success, setSuccess] = useState({
        exist: false,
        msg: ""
    });
    const [error, setError] = useState({
        exist: false,
        msg: ""
    })

    const categories=useSelector(state=>state.categoryReducer.categories);
     
    const close = () => {
        setSuccess({
            flag: false,
            msg: ''
        });
        setError({
            flag: false,
            msg: ''
        })
        if (type === 'add') {
           setName("");
        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < categories.length) {
                if (categories[i].id === id) {
                    setName(categories[i].name);
                    cancelUpdate = true;
                } else {
                    i++;
                }
            }
        }
        setModalOpen(!modalOpen);
    }
 

    const edit = (e) => {
        e.preventDefault();
        if (name === "" ) {
            setSuccess({
                exist: false,
                msg: ''
            });
            setError({
               exist: true,
                msg: 'Veuillez renseigner le nom du catégorie'
            });
        } else {
            setError({
                exist: false,
                msg: ''
            });
            setSuccess({
                exist: false,
                msg: ""
            });
            setLaunchLoader(true);
            axios.put("http://localhost:8080/api/categories",{
                id:id,
                name:name
            }, { headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }      
              }
              ).then(
                response => {
                    setLaunchLoader(false);
                    setError({
                        exist: false,
                        msg: ''
                    });
                    setSuccess({
                        exist: true,
                        msg: response.data.message
                    });
                   
                    getCategories();
                       
                }
            ).catch(
                error => {
                    setSuccess({
                        exist: false,
                        msg: ''
                    });
                    setError({
                        exist: true,
                        msg: error.response.data.message
                    });

                    setLaunchLoader(false);
                }
            )
            }
       
    }
    const add = (e) => {
        e.preventDefault();
        if (name === "" ) {
            setSuccess({
                exist: false,
                msg: ''
            });
            setError({
               exist: true,
                msg: 'Veuillez renseigner le nom du catégorie'
            });
        } else {
            setError({
                exist: false,
                msg: ''
            });
            setSuccess({
                exist: false,
                msg: ""
            });
            setLaunchLoader(true);
            axios.post("http://localhost:8080/api/categories?name="+name, { headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }      
              }
              ).then(
                response =>setTimeout(()=>{
                
                    setLaunchLoader(false);
                    setError({
                        exist: false,
                        msg: ''
                    });
                    setSuccess({
                        exist: true,
                        msg: response.data.message
                    });
                   
                    getCategories();
                   
                }
                
                ,3000) 
            ).catch(
                error => {
                    setLaunchLoader(false);
                    setSuccess({
                        exist: false,
                        msg: ''
                    });
                    setError({
                        exist: true,
                        msg: error.response.data.message
                    });

                    
                }
            )
            }
        }
            
    return (
        <>
            {
                type === "add" ? <IoMdAddCircle type="button" className="text-success ni-2x ml--3 mb-2"
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
                                    {type === "add" ? "Création d'un catégorie " : null}
                                    {type === "edit" ? "Modification d'un catégorie " : null}
                            
                            </div>
                        </CardHeader>
                        <CardBody>
                        {launchloader ? <Loader type="hourglass" bgColor={"#194682"} size={80}/> : null}
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
                            <Form role="form" onSubmit={type === 'edit' ? edit : add}>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label>
                                            Catégorie :
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

export default UpdateCreateCategory;
