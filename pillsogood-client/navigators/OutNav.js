import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
const Nav = createNativeStackNavigator();

const OutNav = () => (
  <Nav.Navigator>
    <Nav.Screen name="Login" component={Login} />
    <Nav.Screen name="Register" component={Register} />
  </Nav.Navigator>
);
export default OutNav;
