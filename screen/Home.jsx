import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkTokenValidity,
  fetchAccessToken,
  getUserInformation,
} from "../utils/api";

export const Home = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (message) => {
    if (message) Alert.alert("Error", message);
    else Alert.alert("Error", "Something went wrong, try again later");
  };

  const getData = async () => {
    if (!login || !login.trim() || login.length > 50) {
      showAlert("Please enter a valid login");
      return;
    }

    setIsLoading(true);

    try {
      let token = await AsyncStorage.getItem("@token");
      // if there is no token, generate new one
      if (!token) {
        token = await fetchAccessToken();
        await AsyncStorage.setItem("@token", token);
      }
      // check the token if it's expired, if it's expired, generate new one
      const tokenInfo = await checkTokenValidity(token);
      if (!tokenInfo.expires_in_seconds || tokenInfo.expires_in_seconds < 60) {
        token = await fetchAccessToken();
        await AsyncStorage.setItem("@token", token);
      }

      // if everything is ok, get user data
      const result = await getUserInformation(login.toLowerCase(), token);

      if (result.status === "success") {
        setIsLoading(false);
        setLogin("");
        navigation.navigate("Profile", { userData: result.data });
      } else {
        showAlert(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      showAlert();
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Swifty Companion</Text>
      <TextInput
        style={styles.input}
        placeholder="Login.."
        placeholderTextColor="white"
        onChangeText={(e) => setLogin(e)}
        value={login}
      />
      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator
              style={{
                marginBottom: -5,
              }}
              size="small"
              color="#fff"
            />
          ) : (
            "Search"
          )}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2980b9",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
