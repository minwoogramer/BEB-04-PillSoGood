import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Nav = createNativeStackNavigator();

const InNav = () => (
  <Nav.Navigator>
    <Nav.Screen name="Home" component={Home} />
  </Nav.Navigator>
);
export default InNav;
