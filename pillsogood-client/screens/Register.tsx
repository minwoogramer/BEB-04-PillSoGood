import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { BASE_COLOR } from "../colors";
import Multiselect from "../src/utils/Multiselect";
import DateTime from "../src/utils/DateTime";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../src/query/MutationQuery";
const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 30px 20px;
`;
const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
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
  // const user = useSelector((state) => state.user.value)
  const passwordInput: any = useRef();
  const emailInput: any = useRef();
  const passwordCheckInput: any = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birth, setBirth] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState([]);
  const [Signup, { data, loading, error }] = useMutation(SIGN_UP);
  const onSubmitEmailEditing: any = () => {
    emailInput.current.focus(); //유저가 입력이 끝나면 다음칸으로가게함
  };
  const onSubmitPasswordEditing: any = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordCheckEditing: any = () => {
    passwordCheckInput.current.focus();
  };
  const onSubmit = async () => {
    if (email === "" || password === "" || name === "" || birth === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      return;
    }
    try {
      Signup({
        variables: {
          nickname: name,
          email: email,
          dateOfBirth: birth,
          password: password,
          phoneNumber: phoneNumber,
          value: value,
        },
      });
    } catch (e) {
      switch (e.code) {
        case password.length < 4: {
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
        keyboardType="default"
        value={name}
        returnKeyType="next"
        onChangeText={(text) => setName(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={emailInput}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitPasswordEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordCheckEditing}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        ref={passwordCheckInput}
        placeholder="PasswordCheck"
        secureTextEntry
        value={passwordCheck}
        returnKeyType="next"
        onChangeText={(text) => setPasswordCheck(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        placeholder="PhoneNumber"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={phoneNumber}
        returnKeyType="done"
        onChangeText={(text) => setPhoneNumber(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />

      <DateTime value={birth} setValue={setBirth} />
      <Multiselect value={value} setValue={setValue} />
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
