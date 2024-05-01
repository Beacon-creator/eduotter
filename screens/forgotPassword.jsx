import React, { useState } from "react";
import { View, Image, SafeAreaView, TextInput, Text, StyleSheet } from "react-native";
import {
  COLORS,
  STYLES,
  BodyText,
  loginstyles,
  SIZES,
  FONT,
} from "../constants/theme";
import FlatButton2 from "../components/button2";
import Check from "../assets/checksuccess.png";
import { useNavigation } from "@react-navigation/native";


function ForgotPassword() {
  const navigation = useNavigation(); // Initialize navigation

  const [email, setEmail] = useState(""); // Declare email state variable
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const isForgotPasswordDisabled = !(isEmailValid && email);


const handleVerificationContinue = () => {
  // Navigate to Forgot Password screen
  navigation.navigate("VerifyPasswordChangeCode");
};


  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View style={{ marginVertical: 40 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={BodyText.Header}>Forgot Password</Text>
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isEmailValid && styles.inputValid,
            isEmailFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            value={email}
            onChangeText={handleEmailChange}
            // Clear the text input value when it's focused
            onFocus={handleEmailFocus}
            onBlur={() => setIsEmailFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isEmailFocused && { color: COLORS.primarybackground },
            ]}
          >
            Enter your Email
          </Text>

          {/* Checkmark icon for valid email */}
          {isEmailValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={BodyText.leftsmalltext}>
            Make sure your email is correct
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatButton2
            text="Continue"
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isForgotPasswordDisabled) {
               handleVerificationContinue;
              }
            }}
            disabled={isForgotPasswordDisabled}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text
            style={{fotnSize: SIZES.medium,
              color: COLORS.primarybackground,
              fontWeight: FONT.bold,
              textAlign: "center",
            }}
          >
            {" "}
            Need Help?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  showTextContainer: {
    position: "absolute",
    right: 12,
    marginTop: 3,
    justifyContent: "center",
    height: "100%",
  },
  showTextContainerValid: {
    position: "absolute",
    right: 40, // Adjust as needed
    top: 1,
    justifyContent: "center",
    height: "100%",
  },
  showText: {
    color: COLORS.black,
  },
  showTextValid: {
    color: COLORS.black,
  },
  forgotpasswordtext: {
    color: COLORS.primarybackground,
    marginTop: 16,
    fontSize: SIZES.xSmall,
  },
  placeholder: {
    position: "absolute",
    top: 2, // Adjust as needed
    left: 10,
    fontSize: SIZES.xxSmall,
    right: 0,
    color: COLORS.black, // Placeholder color
  },
  input: {
    width: "100%",
    fontSize: SIZES.medium,
    fontWeight: FONT.bold,
    color: COLORS.primarybackground,
    marginTop: 3,
    //textAlignVertical: "center",
    justifyContent: "center",
    height: "100%",
  },
  inputFocused: {
    borderColor: COLORS.primarybackground,
  },
  inputValid: {
    borderBottomColor: COLORS.blue,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 18,
    width: 20,
    height: 20,
    tintColor: COLORS.green, // Color for valid input
  },
});

export default ForgotPassword;
