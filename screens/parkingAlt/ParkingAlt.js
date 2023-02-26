import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { db, auth } from "../../config";

import IonicIcon from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

const ParkingAlt = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

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
    // console.log(value);
    const res = db
      .collection("users")
      .where("vehicle_number", "==", value)
      .get()
      .then((resp) => {
        if (resp.size > 0) {
          setStatus(true);
          setQuery(value);
        } else {
          setStatus(false);
        }
      });
  };
  const debounceSearch = debounce(handleSearch, 1000);
  useEffect(() => {
    db.collection("users")
    .doc(auth.currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        setCurrentUser(snapshot.data());
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
          name="vehicle_number"
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
      <TouchableOpacity style={styles.button}>
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
