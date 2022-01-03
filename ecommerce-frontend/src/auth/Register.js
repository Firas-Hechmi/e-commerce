import axios from "axios";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Col,
  Alert,
} from "reactstrap";

const Register = () => {
  const history=useHistory();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [address,setAddress]=useState("");
  const [city,setCity]=useState("");
  const [country,setContry]=useState("");
  const [postalCode,setPostalCode]=useState("");
  const [password,setPassword]=useState("");

  const [error,setError]=useState({
    exist:false,
    msg:""
  })

  const [success,setSucces]=useState({
    exist:false,
    msg:""
  });

  const register=(e)=>{
    e.preventDefault();
    if(username==="" || email==="" || firstName==="" || lastName==="" || address==="" || city==="" || country==="" || postalCode==="" || password===""){
      setError({
        exist:true,
        msg:"Veuillez remplir tous les champs !!"
      })
    }else{
     
      axios.post("http://localhost:8080/api/auth/signup",
      {
        "username":username,
        "email": email,
        "firstName":firstName,
        "lastName":lastName,
        "address":address,
        "city":city,
        "country":country,
        "postalCode":postalCode,
        "password":password
      }
      ).then(
        response=>{
         
          setError({
            exist:false,
            msg:""
          })
          setSucces({
            exist:true,
            msg:response.data.message
          });
          setTimeout(()=>history.push("/auth/signin"),5000);
        }
      ).catch(error=>{
            setError({
              exist:true,
               msg: error.response.data.message
             });

             console.log(error.response);

          }
        )
      
  
    }
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
  
            <Form role="form" onSubmit={register}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Identifiant" name="username"
                  value={username}
                  onChange={e=>setUsername(e.target.value)}
                  type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                 
                  <Input
                    placeholder="Prénom"
                    name="firstName"
                    value={firstName}
                    onChange={e=>setFirstName(e.target.value)}
                    type="text"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
          
                  <Input placeholder="Nom" name="lastName" 
                  value={lastName}
                  onChange={e=>setLastName(e.target.value)}
                  type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                 
                  <Input
                    placeholder="Addresse"
                    name="address"
                    type="text"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
              
                  <Input
                    placeholder="Ville"
                    name="city"
                    type="text"
                    value={city}
                    onChange={e=>setCity(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
               
                  <Input placeholder="Pays" name="country" 
                  value={country}
                  onChange={e=>setContry(e.target.value)}
                  type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                
                  <Input
                    placeholder="Code postal"
                    value={postalCode}
                    type="text"
                    name="postalCode"
                    onChange={e=>setPostalCode(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
               
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    name="password"
                    onChange={e=>setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
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
            {success.exist ?
               <Alert color="success" className="text-center">
               <strong>{success.msg}</strong> 
             </Alert>
             : null}
           
         </div>
           
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                    Créer un compte
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
    
      </Col>
     
     
    </>
  );
};

export default Register;
