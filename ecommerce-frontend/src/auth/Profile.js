import Header from "components/Header";
import { FaBell } from "react-icons/fa";
import {
  Alert,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import {useState,useEffect} from "react";



const Profile = () => {
  const [newUsername,setNewUsername]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [address,setAddress]=useState("");
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [postalCode,setPostalCode]=useState("");
  const [pwd,setPwd]=useState("");


  const setInformations=(responseData)=>{
    setNewUsername(responseData.username);
    setUsername(responseData.username);
    setEmail(responseData.email);
    setLastName(responseData.lastName);
    setFirstName(responseData.firstName);
    setAddress(responseData.address);
    setCity(responseData.city);
    setCountry(responseData.country);
    setPostalCode(responseData.postalCode);

  }

  const [error,setError]=useState({
    exist:false,
    msg:""
  });

  const [success,setSucces]=useState({
    exist:false,
    msg:""
  });

  const update=(e)=>{
    e.preventDefault();
    if(newUsername==="" || pwd==="" || email==="" || firstName==="" || lastName==="" || address==="" || city==="" || country==="" || postalCode===""){
      setError({
        exist:true,
        msg:"Veuillez remplir tous les champs !!"
      })
    }else{
      setError({
        exist:false,
        msg:""
      });
      setSucces({
        exist:false,
        msg:"" 
      }); 
 
      axios.post("http://localhost:8080/api/user/update",
      {
       "id":localStorage.getItem("id"),
       "newUsername":newUsername,
       "username":username,
       "email": email,
       "firstName":firstName,
       "lastName":lastName,
       "address":address,
       "city":city,
       "country":country,
       "postalCode":postalCode,
       "password":pwd
     }, { headers: {
       Authorization: "Bearer " + localStorage.getItem("accessToken")
       }      
     }
     ).then(
       response=>{
         setError({
           exist:false,
           msg:""
         });
         setSucces({
           exist:true,
           msg:"Vos données ont été mises à jour avec succés !" 
         });
         localStorage.setItem("username",newUsername);
         setUsername(newUsername);
         localStorage.setItem("accessToken",response.data.accessToken);
      }
     ).catch(
       error=>{
         let errorMsg="";
         console.log(error.response.data.message)
         if(error.response.data.message==="Error: Unauthorized"){
                errorMsg="Mot de passe est incorrect !!";
         }else{
              errorMsg=error.response.data.message;
         }
         setError({
         exist:true,
         msg:errorMsg
       })
       }
     )
      }
     }
 useEffect(()=>axios.get("http://localhost:8080/api/user?username="+localStorage.getItem("username"), 
 { headers: {
     Authorization: "Bearer " + localStorage.getItem("accessToken")
  }         }
  ).then(response=>{
    setInformations(response.data);
  }),[])
  
  return (
    <>
      <Header />
      <Container  fluid > 
        <Row>
        
          <Col className="order-xl-1 ml-lg-auto mr-lg-auto" xl="8">
            <Card className="bg-secondary shadow">
              
              <CardBody>
                <Form onSubmit={update}>
                  <h6 className="heading text-muted mb-4">
                    Vos informations
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Identifiant
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={newUsername}
                            onChange={(e)=>setNewUsername(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
    
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-1" />
                  {/* Address */}
                
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Addresse
                          </label>
                          <Input
                            className="form-control-alternative"
                           value={address}
                           onChange={(e)=>setAddress(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                           Ville
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                           Pays
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                           Code postal
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={postalCode}
                            onChange={(e)=>setPostalCode(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <FormGroup>
                          <label
                            className="form-control-label" 
                          >
                           Entrez votre mot de passe pour valider la modification
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={e=>setPwd(e.target.value)}
                            value={pwd}
                            type="password"
                          />
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
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Modifier</button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default Profile;
