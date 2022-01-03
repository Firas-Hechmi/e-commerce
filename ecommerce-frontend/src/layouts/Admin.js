
import React, { useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import UserNavbar from "components/UserNavbar.js";

import Sidebar from "components/Sidebar.js";

import routes from "routes.js";
import axios from "axios";
import { setProducts } from "redux/actions/product-actions";
import { useDispatch } from "react-redux";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const dispatch=useDispatch();
  const getProducts=()=>{
    axios.get(" http://localhost:8080/api/products").then(
      response=>dispatch(setProducts(response.data))
    )
  }
  useEffect(()=>getProducts(),[]);


  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
       
      />
      <div className="main-content" ref={mainContent}>
        <UserNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        
      </div>
    </>
  );
};

export default Admin;
