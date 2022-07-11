import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput } from "react-native";
const Container = styled.View``;
const Text = styled.Text``;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitEditing = () => {
    console.log("focus password");
  };
  return (
    <Container>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEditing}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
      />
    </Container>
  );
};

export default Register;
