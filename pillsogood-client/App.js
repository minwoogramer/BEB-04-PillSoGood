import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
