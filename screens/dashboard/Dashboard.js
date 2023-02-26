import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons"
const Dashboard = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);
  // console.log(name.firstName);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View>
          <Text>
            Welcome {name.firstName} {name.lastName}
          </Text>
        </View>
        <View style={styles.menuTab}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
          <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ionic name="person-add-outline" size={50} />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Profile
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Accidential")}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
          <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ionic name="bandage-outline" size={30} />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Accidential Emergency
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Parking")}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
           <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ionic name="car-outline" size={50} />
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                Send Parking Alert
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("VehicleInfo")}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
           <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ionic name="car-outline" size={50} />
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                Vehicle Information
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Scanner")}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
           <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ionic name="search-outline" size={50} />
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                Scan
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("tel:112");
            }}
            style={[{
              padding: 10,
              marginBottom: 8,
            }, styles.tabItem]}
          >
          <Ionic name="call-outline" size={50} />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Call on 112
            </Text>
          </TouchableOpacity>
          
        </View>
        <View style={{display: 'flex', alignItems:'center', justifyContent:'center',marginBottom:20}}>
        <TouchableOpacity onPress={() => auth.signOut()} style={styles.button}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  menuTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginRight: 2,
  },
  tabItem:{
    width: 120,
    height:120,
    backgroundColor:"#72be7a",
    borderRadius:10,
    marginRight:5,
    fontSize:18,
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
});
