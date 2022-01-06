
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from "reactstrap";
import MyComponent from 'react-fullpage-custom-loader';
import {FaBell, FaUserAlt} from 'react-icons/fa';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { RiLoginBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux"; 
import { login } from "redux/actions/auth-actions.js";

  const Login = () => {
  
    const history=useHistory();
    const  dispatch = useDispatch();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loader,setLoader]=useState(false);
    const [isPasswordHidden, setPasswordHideness] = useState(true);
    const [error,setError]=useState({
      exist:false,
      msg:""
    })

    const connexion=(e)=>{
       e.preventDefault();
       if(username==="" || password===""){
        setError({
          exist:true,
          msg:"Veuillez remplir tous les champs !!"
        })
       }else{
       setLoader(true);
       axios.post("http://localhost:8080/api/auth/signin",{
         "username":username,
         "password":password
       }).then(response=>{
             localStorage.setItem("id",response.data.id);
             localStorage.setItem("username",response.data.username);
             localStorage.setItem("roles",response.data.roles);
             localStorage.setItem("type",response.data.tokenType);
             localStorage.setItem("accessToken",response.data.accessToken);
             dispatch(login());
              setLoader(false);
              history.push("/admin/index");
              }
        ) 
        .catch(error=>{
              setLoader(false);
              setError({
                exist:true,
                msg:"Vos identifiants sont incorrects !!"
              })
             }
          );
        }
    };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
  
            <div className="btn-wrapper text-center">
            
              <FaUserAlt style={{color:"#EC9923",fontSize: "60px"}} color="primary"/>

            </div>
          </CardHeader>
          <CardBody className="px-lg-5 ">
          <div className="text-center text-muted">
            {error.exist ?
                   <Alert color="danger">
                     <span className="alert-inner--icon">
                          <FaBell/>
                    </span>{" "}
                     <span className="alert-inner--text">
                         <strong>{error.msg}</strong>
                     </span>
                </Alert> 
            : null}
           
         </div>
            <Form role="form" onSubmit={connexion}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" color="primary" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={username}
                    placeholder="Identifiant"
                    type="text"
                    onChange={e=>setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" color="primary" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={password}
                    placeholder="Mot de passe"
                    type={isPasswordHidden ? 'password' : 'text'}
                    onChange={e=>setPassword(e.target.value)}
                  />
                      <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        {isPasswordHidden ?
                                                            <AiFillEye color="primary" onClick={() => setPasswordHideness(false)}
                                                                       className="ni ni-lock-circle-open primary-icon"/> : null}
                                                        {!isPasswordHidden ? <AiFillEyeInvisible color="primary"
                                                            onClick={() => setPasswordHideness(true)}
                                                            className="ni ni-lock-circle-open primary-icon"/> : null}
                                                    </InputGroupText>
                       </InputGroupAddon>

                 </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button color="primary" type="submit">
                <RiLoginBoxFill style={{fontSize:"19px"}} /> 
                  Se connecter
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      {loader ? 
       <MyComponent sentences={[]}/>
      : null}
     
    </>
  );
};

export default Login;
