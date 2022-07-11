import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import OutNav from "./navigators/OutNav";
import InNav from "./navigators/InNav";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      //인증상태감지
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    console.log(auth().currentUser);
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
