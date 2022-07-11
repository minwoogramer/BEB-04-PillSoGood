import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { TextInput } from "react-native";
import { ActivityIndicator, Alert } from "react-native";
import { BASE_COLOR } from "../colors";
import Multiselect from "./../src/utils/Multiselect";

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 60px 20px;
`;
const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  margin-top: 50px;
  width: 60%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;

  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
const Register = () => {
  const passwordInput = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();

    console.log("focus password");
  };
  const onSubmit = async () => {
    if (email === "" || password === "" || name === "" || birth === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
    } catch (e) {
      switch (e.code) {
        case "auth/weak-password": {
          Alert.alert("Write a stronger password!");
        }
      }
    }
  };
  return (
    <Container>
      <TextInputs
        placeholder="닉네임"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={name}
        returnKeyType="next"
        onChangeText={(text) => setName(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        placeholder="Birthday"
        value={birth}
        returnKeyType="done"
        onChangeText={(text) => setBirth(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Multiselect />
      <Btn onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>아이디 생성!</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Register;
