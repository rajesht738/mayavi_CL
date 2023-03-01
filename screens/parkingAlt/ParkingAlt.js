import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { db, auth } from "../../config";
import messaging from "@react-native-firebase/messaging";
import IonicIcon from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

const ParkingAlt = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userToken, setUsertoken] = useState("");
  const [mobile, setMobile] = useState('');
  // send Alert
  const sendPush = async (token) => {
    // alert(token);
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=`,
      },
      body: JSON.stringify({
        to: token,
        priority: "high",
        data: {
              title: "Parking Alert Message!",
              body: "Please Adjust Your Vehicle",
              mobile: mobile
            },
      }),
    }).then((res) => {
      if (res.status == 200) {
        alert("Alert Message Sent!");
      }
    });

    // Notification details.
    // const payload = {
    //   notification: {
    //     title: "Payment completed!",
    //     body: `Thank you, we received your payment.`,
    //   },
    // };

    // // Send notifications to all tokens.
    // messaging().sendToDevice(uid, payload)
    //   .then((response)=> {
    //     console.log("Successfully sent push: ", response);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log("Error sending push:", error);
    //   });

    // return results;
    // // Get the user from Firestore
    // const getDeviceTokensPromise = db.collection("users").doc(uid).get();
    // // console.log(getDeviceTokensPromise)
    // // Get the User profile from Firebase Auth
    // const getUserProfilePromise = auth.getUser(uid);

    // Promise.all([getDeviceTokensPromise, getUserProfilePromise])
    //   .then(function (results) {
    //     // The array containing all the user's tokens.
    //     const tokens = Object.keys(results[0].data().uid);
    //     console.log(tokens);
    //     // The user profile from Firebase Auth
    //     const user = results[1];

    //     // Check if there are any device tokens.
    //     if (tokens.length === 0) {
    //       return console.log("There are no notification tokens to send to.");
    //     }

    //     // Notification details.
    //     const payload = {
    //       notification: {
    //         title: "Payment completed!",
    //         body: `Thank you, ${user.displayName}, we received your payment.`,
    //       },
    //     };

    //     // Send notifications to all tokens.
    //     messaging()
    //       .sendToDevice(tokens, payload)
    //       .then(function (response) {
    //         console.log("Successfully sent push: ", response);
    //         return response;
    //       })
    //       .catch(function (error) {
    //         console.log("Error sending push:", error);
    //       });

    //     return results;
    //   })
    //   .catch(function (error) {
    //     console.log("Error retrieving tokens or user details:", error);
    //   });
  };
  //let timeOutId;
  // const debounce = (func, delay) => {
  //   return (...args) => {
  //     if (timeOutId) clearTimeout(timeOutId);
  //     timeOutId = setTimeout(() => {
  //       func.apply(null, args);
  //     }, delay);
  //   };
  // };

  const handleChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setQuery(text);
    debounceSearch(text);
  };
  const handleSearch = (value) => {
    db.collection("users")
      .where("vehicle_number", "==", value)
      .get()
      .then((snapshot) => {
        if (snapshot.size > 0) {
          setStatus(true);
          setQuery(value);
          snapshot.forEach((doc) => {
            setUsertoken(doc.data().token);
            console.log(doc.data().token);
          });
        } else {
          setStatus(false);
        }
      });
  };

  const debounceSearch = debounce(handleSearch, 500);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          setMobile(snapshot.data().mobile);
        } else {
          console.log("user not found");
        }
      });
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TextInput
          name="vehicle_number"
          style={[styles.textInput, { borderColor: status ? "green" : "red" }]}
          placeholder="Enter Vehicle Number"
          value={query}
          onChange={handleChange}
        />
        {status ? (
          <Text>
            Available
            <IonicIcon
              name="checkmark-circle-outline"
              size={20}
              color="green"
            />
          </Text>
        ) : (
          ""
        )}
      </View>
      <View>
        <TextInput
          name="request_name"
          style={[styles.textInput]}
          placeholder="Enter Name"
          value={`${currentUser.firstName}`}
        />
        <TextInput
          name="mobile"
          style={[styles.textInput]}
          placeholder="Enter Mobile Number"
          value={currentUser.mobile}
        />
      </View>
      <TouchableOpacity
        onPress={() => sendPush(userToken)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Send Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParkingAlt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: windowWidth - 50,
    height: 50,
    fontSize: 18,
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    borderBottom: 1,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    marginBottom: 10,
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
});
