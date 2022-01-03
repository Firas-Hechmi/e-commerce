
import Index from "shop/Index.js";
import Profile from "auth/Profile.js";
import Register from "auth/Register.js";
import Login from "auth/Login.js";
import Cart from "shop/Cart.js";
import Commands from "shop/Commands";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/cart",
    name: "Panier",
    icon: "ni ni-bullet-list-67 text-red",
    component: Cart,
    layout: "/admin",
  },
  {
    path: "/commands",
    name: "Commands",
    icon: "ni ni-bullet-list-67 text-red",
    component: Commands,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
