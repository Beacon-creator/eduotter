import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FlatButton2 from "../components/button2";
import { COLORS, BodyText, STYLES, SIZES, FONT } from "../constants/theme";
import SmallBox from "../components/smallbox";

function VerifyPasswordChangeCode() {
  const navigation = useNavigation(); // Initialize navigation

  const [isForgotPasswordDisabled, setIsForgotPasswordDisabled] =
    useState(false);

  const handleVerificationContinue = () => {
    // Navigate to NewPassword screen
    navigation.navigate("NewPassword");
  };

  const handleResendcode = () => {
    // Navigate to NewPassword screen
    navigation.navigate("NewPassword");
  };

  const smallBoxRef = useRef(null);

  const handleSmallBoxChange = (value) => {
    const allFieldsFilled =
      value.length === 4 && value.every((val) => val !== "");
    setIsForgotPasswordDisabled(!allFieldsFilled);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.Header}>Verification Code</Text>
          <View>
            <Text style={BodyText.centersmalltext2}>email</Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <SmallBox
            ref={smallBoxRef}
            length={4} // Customize the length of the password input
            inputStyle={{ borderColor: COLORS.borderBlue }} // Customize the style of the input
            containerStyle={{ marginTop: 10 }} // Customize the style of the container
            onChange={handleSmallBoxChange} // Callback function to handle changes in SmallBox
            // Any additional props to pass to the TextInput component
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatButton2
            text="Continue"
            backColor={COLORS.primarybackground}
            textColor={COLORS.white}
            onPress={() => {
              if (!isForgotPasswordDisabled) {
                handleVerificationContinue(); // Call the function
              }
            }}
            disabled={isForgotPasswordDisabled}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableOpacity onPress={handleResendcode}>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: COLORS.primarybackground,
                fontWeight: FONT.bold,
                textAlign: "center",
              }}
            >
              {" "}
              Resend code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default VerifyPasswordChangeCode;
