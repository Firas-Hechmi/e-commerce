import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Media
  } from "reactstrap";
  
  import Header from "components/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";

  const Commands = () => {

    const [commands,setCommands]=useState([]);
    
    const getParsedDate=(date)=>{
  
     return "Le "+date.slice(0,10)+" à "+date.slice(11,16)+"h";
    }
    

    const getCommands=()=>{
      let id=localStorage.getItem("id").toString();
      axios.get(" http://localhost:8080/api/commands/"+id,
      { headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
     }}).then(
        response=>setCommands(response.data)
      )
    }
    useEffect(()=>getCommands(),[])

    return (
      <>
        <Header />
   
        <Container  fluid>
      
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h2 className="text-default text-center">Mes commandes</h2>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Article</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Quantité</th>
                      <th scope="col">Prix total</th>
                      <th scope="col">Date</th>
              
                    </tr>
                  </thead>
                  <tbody>
                  {commands.map(command=>(
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                         
                          <img  className=" avatar-lg mr-3" alt="..."
                                  src={
                             require("assets/img/products/"+command.productImage)
                                     .default
                                     }
                             
                               />
                      
                         
                          <Media>
                            <span className="mb-0 text-sm">
                              {command.productName}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>   {command.productPrice} $</td>
                      <td>
                      {command.productQuantity}
                      
                      </td>
                      <td>
                      {command.productsTotalPrice}
                      </td>
                      <td>{getParsedDate(command.date)}
                    
                      </td>
                    
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4" >
                
            
                </CardFooter>
              </Card>
            </div>
          </Row>
         
        </Container>
      </>
    );
  };
  
  export default Commands;
  