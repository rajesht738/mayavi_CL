import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, app } from "../../config";
import { Formik } from "formik";
import * as yup from "yup";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  loginUser = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });
  return (
    <View style={styles.container}>
      {/* <Text style={{ fontWeight: "bold", fontSize: 26, paddingBottom: 20 }}>
        Login
      </Text> */}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => loginUser(values.email, values.password)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              caretHidden={false}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              caretHidden={false}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
              disabled={!isValid}
            >
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate('Registration')}
            style={{
              marginTop: 10
            }}
            >
              <Text>Don't have account? Register Here!</Text>
            </TouchableOpacity>
          </>
        )}
      
      
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    color: "#fff",
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});
