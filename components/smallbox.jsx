import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../constants/theme";

const SmallBox = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState(Array(props.length).fill(""));

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

const handleChange = (index, value) => {
  if (/^\d*$/.test(value)) {
    const newInputValue = [...inputValue];
    newInputValue[index] = value.toString(); // Convert value to string
    setInputValue(newInputValue);
    props.onChange(newInputValue);
  } else {
    const newInputValue = [...inputValue];
    newInputValue[index] = ""; // Clear the input if it's not a number
    setInputValue(newInputValue);
  }
};
  const handleFocus = (index) => {
    const newInputValue = [...inputValue];
    newInputValue[index] = true;
    setInputValue(newInputValue);
  };

const handleBlur = (index) => {
  const newInputValue = [...inputValue];
  if (!newInputValue[index]) {
    // Preserve the entered value if it's not empty
    newInputValue[index] = inputValue[index] || "";
    setInputValue(newInputValue);
  }
};

  return (
    <View style={[styles.container, props.containerStyle]}>
      {inputValue.map((value, index) => (
        <TextInput
          key={index}
          style={[
            styles.input,
            props.inputStyle,
            value && styles.inputFilled,
            value && props.inputFilledStyle,
          ]}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          maxLength={1}
          keyboardType="numeric"
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
        />
      ))}
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 40,
    height: 60,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: SIZES.large,
    borderColor: COLORS.black,
  },
  inputFilled: {
    color: COLORS.primarybackground,
    borderColor: COLORS.primarybackground,
  },
});


export default SmallBox;
