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
import axios from "axios";
const Signup = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isLoginDisabled = !(
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    username &&
    email &&
    password
  );

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("ForgotPassword");
  };

const handleSignup = async () => {
  try {
    // Check if all fields are valid
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      // Make a POST request to your backend signup endpoint
      const response = await axios.post("http://your-backend-url/signup", {
        username: username,
        email: email,
        password: password,
      });

      // Handle successful signup
      console.log("Signup successful:", response.data);
      // You may want to redirect the user to a different page or show a success message here
      navigation.navigate("Login");
    } else {
      // Display an error message if any field is invalid
      console.error("Invalid signup data");
      // You may want to display an error message to the user
    }
  } catch (error) {
    // Handle errors
    console.error("Error signing up:", error.response.data);
    // You may want to display an error message to the user
  }
};


  const handleLogin = () => {
    // Navigate to Forgot Password screen
    navigation.navigate("Login");
  };


  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setIsUsernameFocused(false);
    setIsPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsEmailFocused(false);
    setIsUsernameFocused(false);
  };

   const handleUsernameChange = (text) => {
     setUsername(text);
     setIsUsernameValid((text));
   };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
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
          <Text style={BodyText.Header}>Sign up to new opportunities</Text>
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
            keyboardType="text"
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
            Username
          </Text>

          {/* Checkmark icon for valid email */}
          {isUsernameValid && <Image source={Check} style={styles.icon} />}
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
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
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
            Email
          </Text>

          {/* Checkmark icon for valid email */}
          {isEmailValid && <Image source={Check} style={styles.icon} />}
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

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              color: COLORS.othertext,
              fontSize: SIZES.xxSmall,
              fontWeight: FONT.bold,
            }}
          >
            6+ characters, atleast 1 uppercase & 1 number
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatButton2
            text="Continue"
            backColor={COLORS.primarybackground}
            textcolor={COLORS.white}
            onPress={() => {
              if (!isLoginDisabled) {
                handleSignup;
              }
            }}
            disabled={isLoginDisabled}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={BodyText.centersmalltext}>
            Already have an account?
            <TouchableOpacity style={{ marginTop: 10 }} onPress={handleLogin}>
              <Text
                style={
              BodyText.centersmalltext3
                }
              >
                {"  "}
                Log in
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Bigbuttonicon
            iconSource={GoogleIcon}
            text="Sign up with Google"
            backColor={COLORS.transparent}
            textcolor={COLORS.black}
          />

          <Bigbuttonicon
            iconSource={AppleIcon}
            text="Sign up with Apple"
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

export default Signup;