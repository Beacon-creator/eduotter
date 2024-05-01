import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import {
  STYLES,
  BodyText,
  COLORS,
  loginstyles,
  SIZES,
  FONT,
} from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FlatButton2 from "../components/button2";
import GoogleIcon from "../assets/google.png";
import AppleIcon from "../assets/apple.png";
import Check from "../assets/checksuccess.png";
import Bigbuttonicon from "../components/bigbuttonicon";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isLoginDisabled = !(
    isUsernameValid &&
    isPasswordValid &&
    username &&
    password
  );

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("ForgotPassword");
  };

   const handleLogin = () => {
     // Navigate to Forgot Password screen
     navigation.navigate("Home");
   };

    const handleSignup = () => {
      // Navigate to Forgot Password screen
      navigation.navigate("Signup");
    };

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
    setIsPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsUsernameFocused(false);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setIsUsernameValid(validateEmail(text));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(validatePassword(text));
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password validation
    // At least 6 characters, one uppercase letter, and one number
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const renderShowText = () => {
    if (isPasswordValid) {
      // If password is valid, position the "Show" text to the left
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainerValid}
        >
          <Text style={styles.showTextValid}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    } else {
      // If password is invalid, maintain the initial position of the "Show" text
      return (
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showTextContainer}
        >
          <Text style={styles.showText}>
            {isPasswordShown ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ ...STYLES.container, flex: 1 }}>
      <View>
        <View style={{ marginVertical: 10 }}>
          <Text style={BodyText.Header}>Welcome Back</Text>
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isUsernameValid && styles.inputValid,
            isUsernameFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
            value={username}
            onChangeText={handleUsernameChange}
            // Clear the text input value when it's focused
            onFocus={handleUsernameFocus}
            onBlur={() => setIsUsernameFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isUsernameFocused && { color: COLORS.primarybackground },
            ]}
          >
            Username or Email
          </Text>

          {/* Checkmark icon for valid email */}
          {isUsernameValid && <Image source={Check} style={styles.icon} />}
        </View>

        <View
          style={[
            loginstyles.inputArea,
            isPasswordValid && styles.inputValid,
            isPasswordFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholderTextColor={COLORS.black}
            secureTextEntry={!isPasswordShown}
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={() => setIsPasswordFocused(false)}
          />
          {/* Absolute positioning for the placeholder text */}
          <Text
            style={[
              styles.placeholder,
              isPasswordFocused && { color: COLORS.primarybackground },
            ]}
          >
            Password
          </Text>

          {/* Checkmark icon for valid password */}
          {isPasswordValid && <Image source={Check} style={styles.icon} />}
          {renderShowText()}
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={{
                color: COLORS.primarybackground,
                fontSize: SIZES.small,
                fontWeight: FONT.bold,
              }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatButton2
            text="Log in"
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isLoginDisabled) {
                handleLogin;
              }
            }}
            disabled={isLoginDisabled}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={BodyText.centersmalltext}>
            Don't have an account?
            <TouchableOpacity style={{ marginTop: 10 }} onPress={handleSignup}>
              <Text
                style={{
                  marginTop: 10,
                  color: COLORS.primarybackground,
                  fontWeight: FONT.bold,
                }}
              >
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Bigbuttonicon
            iconSource={GoogleIcon}
            text="Sign in with Google"
            backColor={COLORS.transparent}
            textcolor={COLORS.black}
          />

          <Bigbuttonicon
            iconSource={AppleIcon}
            text="Sign in with Apple"
            backColor={COLORS.black}
            textcolor={COLORS.white}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default Login;
