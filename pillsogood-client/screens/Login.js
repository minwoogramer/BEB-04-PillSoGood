import React from "react";
import styled from "styled-components/native";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnTxt = styled.Text``;

const Login = ({ navigation: { navigate } }) => (
  <Container>
    <Text>
      Login
      <Btn onPress={() => navigate("Register")}>
        <BtnTxt>Register</BtnTxt>
      </Btn>
    </Text>
  </Container>
);

export default Login;
