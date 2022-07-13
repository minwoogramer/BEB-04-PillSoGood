import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { diseaseActions } from "../store/diseaseSlice";
import { View } from "react-native";
function Multiselect({ value, setValue }: any) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "고지혈증", value: "고지혈증" },
    { label: "고혈압", value: "고혈압" },
    { label: "당뇨", value: "당뇨" },
  ]);

  return (
    <View>
      <DropDownPicker
        style={{
          borderColor: "white",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          marginVertical: 22,
        }}
        containerStyle={{}}
        dropDownContainerStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.87)",
        }}
        placeholderStyle={{
          color: "grey",
          fontWeight: "bold",
        }}
        dropDownDirection={"TOP"}
        showTickIcon={false}
        showArrowIcon={true}
        placeholder="질환을 선택해주세요"
        multiple={true}
        min={0}
        max={3}
        open={open}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#8ac926"]}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}
export default Multiselect;
