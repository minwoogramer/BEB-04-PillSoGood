import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

function Multiselect() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "고지혈증", value: "고지혈증" },
    { label: "고혈압", value: "고혈압" },
    { label: "당뇨", value: "당뇨" },
  ]);
  const [value, setValue] = useState([]);

  return (
    <DropDownPicker
      zIndex={3000}
      zIndexInverse={1000}
      style={{
        marginTop: 15,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
      dropDownContainerStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        marginTop: 14,
      }}
      translation={{
        PLACEHOLDER: (value) => {
          setValue(value);
        },
      }}
      placeholderStyle={{
        color: "grey",
        fontWeight: "bold",
      }}
      showTickIcon={true}
      hideSelectedItemIcon={true}
      showArrowIcon={true}
      placeholder="질환을 선택해주세요"
      multiple={true}
      min={0}
      max={3}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
export default Multiselect;
