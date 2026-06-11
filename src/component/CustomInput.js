import React, { useState, forwardRef } from "react";
import { TextInput } from "react-native";

// Wrapped properly inside forwardRef so parent components can reference it securely without breaking the layout rendering loop
export const CustomInput = (
  {
    value,
    onChange,
    placeHolder,
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChange}
      placeholder={placeHolder}
      placeholderTextColor={"#afacac"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        borderWidth: 1,
        borderColor: isFocused ? '#8687E7' : '#555555',
        padding: 12,
        borderRadius: 10,
        color: "white",
        fontSize: 16,
        backgroundColor: '#1E1E1E',
        width: '100%'
      }}
      cursorColor={'#8687E7'}
    />
  );
}
