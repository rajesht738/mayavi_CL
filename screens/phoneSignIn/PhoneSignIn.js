import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((error) => {alert(error)})
      ;

    setPhoneNumber("");
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
      })
      .catch((error) => {
        //show an alert in case of error
        alert(error);
      });
    Alert.alert("Login Successful...");
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.otpText}>Login using OTP</Text>
      <TextInput
        placeholder="Phone Number With country code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send verification</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.textInput}
      />

      <TouchableOpacity
        style={styles.sendCode}
        onPress={confirmCode}
      >
        <Text style={styles.buttonText}>Confirm verification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneSignIn;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems: "center",
        justifyContent:'center'
    },
    textInput:{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomColor: "#98FF98",
        borderBottomWidth:2,
        marginBottom: 20,
        textAlign: 'center',
        color:'#98FF98'
    },
    sendVerification:{
        padding:20,
        backgroundColor:'#3498db',
        borderRadius: 10,
    },
    sendCode:{
        padding:20,
        backgroundColor:'#9b59b6',
        borderRadius:10,
    },
    buttonText:{
        textAlign: 'center',
        color:"#fff",
        fontWeight:"bold"
    },
    otpText:{
        fontSize: 24,
        fontWeight: "bold",
        color:"#fff",
        margin: 20
    }
});
