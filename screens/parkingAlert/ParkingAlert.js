import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import { auth, db } from "../../config";
import { collection, doc, getDocs, QuerySnapshot } from "firebase/firestore";
const ParkingAlert = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  //We will store current being edited input's data and index

  const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=20`;

  const handleSearch = (text) => {
    
    const filterdata = fullData.filter((item) => {
      const itemData = item.vehicle_number ? item.vehicle_number.toUpperCase() : ''.toUpperCase();
      const formattedQuery = text.toUpperCase();
      return itemData.indexOf(formattedQuery) > -1;
    })
    // const filteredData = filter(fullData, (user) => {
    //    return contains(user, formattedQuery);
    // //  console.log("Full d",formattedQuery);
    // });
    setData(filterdata);
    setQuery(text);
    //  console.log("filteredData", filteredData);
    // console.log("data", data);
  };

  // const contains = (dt, query) => {
  //    const { vehicle_number} = dt;
  //   // console.log('contain',lastName);
  //   if (
  //      vehicle_number.includes(query)
  //   ) {
  //     return true;
  //   }

  //   return false;
  // };
  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
      </View>
    );
  }
  // const res = async () =>{
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   setData(querySnapshot)
  //   setFullData(querySnapshot);
  //   console.log(querySnapshot.docs.);
  // }
  const res = db.collection("users");

  useEffect(() => {
    setIsLoading(true);
    res.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { vehicle_number, firstName, lastName } = doc.data();
        users.push({
          id: doc.id,
          vehicle_number,
          firstName,
          lastName,
        });
      });
      // console.log(users);
      setData(users);
      setFullData(users);

      setIsLoading(false);
    });

    // db.collection("users").doc(auth.currentUser.uid)
    // .get()
    // .then((snapshot) => {
    //   console.log(snapshot.exists);
    //   if (snapshot.exists) {
    //     console.log(snapshot.data());
    //     setData(snapshot.data());
    //     setFullData(snapshot.data());

    //     setIsLoading(false);

    //   } else {
    //     console.log("user not found");
    //   }
    // }).catch((err) => {
    //   setIsLoading(false);
    //   setError(err);
    // })
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
     <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
      <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search Vehicle Number"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
        </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* <Image
              source={{ uri: item.picture.thumbnail }}
              style={styles.coverImage}
            /> */}
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{`${item.vehicle_number}`}</Text>
              <Text
                style={styles.title}
              >{`${item.firstName} ${item.lastName}`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ParkingAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
});
