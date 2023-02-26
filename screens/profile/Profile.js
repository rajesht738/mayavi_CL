import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db, firebaseConfig, storage } from "../../config";
import { Field, Formik } from "formik";
import CustomInput from "../../utility/CustomInput";
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage } from "../../services/users";
import { registerValidationSchema } from "./Validation";
const Profile = () => {
  // const db = getFirestore(app);

  const [data, setData] = useState("");
  const [image, setImage] = useState("");
 
  const UpdateUser = async (
    vehicle_number,
    firstName,
    lastName,
    email,
    mobile,   
    alternate_mobile
  ) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const data = {
      vehicle_number: vehicle_number,
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      profilePic: image,
      alternate_mobile: alternate_mobile
    };
    setDoc(docRef, data)
      .then((docRef) => {
       // console.log(docRef);
        saveUserProfileImage(image);
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // saveUserProfileImage(image);
    }
  };
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          setData(snapshot.data());
          setImage(data.profilePic);
        } else {
          console.log("user not found");
        }
      });
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>{data.firstName}</Text> */}
        <Formik
          enableReinitialize={true}
          validationSchema={registerValidationSchema}
          initialValues={{
            vehicle_number: data.vehicle_number,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            profilePic: data.profilePic,
            alternate_mobile: data.alternate_mobile,
            
          }}
          onSubmit={(values) =>
            UpdateUser(
              values.vehicle_number,
              values.firstName,
              values.lastName,
              values.email,
              values.mobile,              
              values.alternate_mobile
            )
          }
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
                name="vehicle_number"
                placeholder="Vehicle number"
                style={styles.textInput}
                onChangeText={handleChange("vehicle_number")}
                onBlur={handleBlur("vehicle_number")}
                value={values.vehicle_number}
                caretHidden={false}
              />
              {errors.vehicle_number && touched.vehicle_number && (
                <Text style={styles.errorText}>{errors.vehicle_number}</Text>
              )}
              <TextInput
                name="firstName"
                placeholder="First name"
                style={styles.textInput}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                caretHidden={false}
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
              <TextInput
                name="lastName"
                placeholder="Last Name"
                style={styles.textInput}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                caretHidden={false}
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
              <TextInput
                name="mobile"
                placeholder="Mobile"
                style={styles.textInput}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                value={values.mobile}
                caretHidden={false}
              />
              {errors.mobile && touched.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}

              <TextInput
                name="email"
                placeholder="Email"
                style={styles.textInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                caretHidden={false}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                name="alternate_mobile"
                placeholder="Alternate Mobile Number"
                style={styles.textInput}
                onChangeText={handleChange("alternate_mobile")}
                onBlur={handleBlur("alternate_mobile")}
                value={values.alternate_mobile}
                caretHidden={false}
              />
              {errors.alternate_mobile && touched.alternate_mobile && (
                <Text style={styles.errorText}>{errors.alternate_mobile}</Text>
              )}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Image
                    source={{ uri: data.profilePic }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                disabled={!isValid}
              >
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>Update</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Profile;

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
    borderRadius: 5,
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
