import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../config";
import { TextInput } from "react-native-gesture-handler";
import { Formik, Field } from "formik";

import CustomInput from "../../utility/CustomInput";
import { registerValidationSchema } from "./Validations";

const Registration = () => {
  const registerUser = async (vehicle_number,firstName, lastName, email, mobile, password) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://mayacl-54f4c.firebaseapp.com",
        });
      })
      .then(() => {
        alert("Verification email sent");
      })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        db.collection("users").doc(auth.currentUser.uid).set({
          vehicle_number,
          firstName,
          lastName,
          email,
          mobile,
        });
      })
      .catch((error) => {
        alert(error.message);
      })
      .catch((error) => {
        alert(error.message);
      })
      ;
  };
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>Register Here!</Text>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{vehicle_number:'', firstName: "", lastName: "", email: "",mobile:"", password: "" }}
        onSubmit={(values) =>
          registerUser(
            values.vehicle_number,
            values.firstName,
            values.lastName,
            values.email,
            values.mobile,
            values.password
            )
        }
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomInput}
              name="vehicle_number"
              placeholder="Vehicle Number"
            />
            <Field
              component={CustomInput}
              name="firstName"
              placeholder="First Name"
            />
            <Field
              component={CustomInput}
              name="lastName"
              placeholder="Last Name"
            />
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <Field
              component={CustomInput}
              name="mobile"
              placeholder="Mobile number"
             
            />
            <Field
              component={CustomInput}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
              disabled={!isValid}
            >
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
    </ScrollView>
  );
};

export default Registration;

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
