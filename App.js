import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header.js";
import {auth} from "./config.js";

import messaging from "@react-native-firebase/messaging";
import firebase from "./config.js";
import AccidentialEmergency from "./screens/accidentialEmergency/AccidentialEmergency.js";
import Dashboard from "./screens/dashboard/Dashboard.js";
import Login from "./screens/login/Login.js";
import ParkingAlert from "./screens/parkingAlert/ParkingAlert.js";
import ParkingAlt from "./screens/parkingAlt/ParkingAlt.js";
import PhoneSignIn from "./screens/phoneSignIn/PhoneSignIn.js";
import Profile from "./screens/profile/Profile.js";
import Registration from "./screens/registration/Registration.js";
import Scanner from "./screens/scanner/Scanner.js";
import VehicleInfo from "./screens/vehicleInfo/VehicleInfo.js";
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const Stack = createStackNavigator();

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };
  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    subscriber;
    // if (requestUserPermission()) {
    //   //return fcm token for the device
    //   messaging()
    //     .getToken()
    //     .then((token) => {
    //       console.log(token);
    //     });
    // } else {
    //   console.log("Failed token status", authStatus);
    // }
    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(async (remoteMessage) => {
    //     if (remoteMessage) {
    //       console.log(
    //         "Notification caused app to open from quit state:",
    //         remoteMessage.notification
    //       );
    //       // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //     }
    //   });
    // // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //   console.log(
    //     "Notification caused app to open from background state:",
    //     remoteMessage.notification
    //   );
    //   // navigation.navigate(remoteMessage.data.type);
    // });
    // // Register background handler
    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log("Message handled in the background!", remoteMessage);
    // });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    //  return unsubscribe;
   
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Phone"
          component={PhoneSignIn}
          options={{
            headerTitle: () => <Header name="Maya CL" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
             },
             headerTitleAlign: 'center',
          }}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Maya CL" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
             },
             headerTitleAlign: 'center',
          }}
        />
   
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Maya" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
       <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle: () => <Header name="Maya CL" />,
        headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
      }}
    />
         <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => <Header name="Profile" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
         <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerTitle: () => <Header name="Scanner" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
             <Stack.Screen
          name="VehicleInfo"
          component={VehicleInfo}
          options={{
            headerTitle: () => <Header name="Vehicle Information" />,
            headerStyle: {
              height: 158,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
       <Stack.Screen
      name="Accidential"
      component={AccidentialEmergency}
      options={{
        headerTitle: () => <Header name="Accidential" />,
        headerStyle: {
          height: 158,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: "#00e4d0",
          shadowColor: "#000",
          elevation: 25,
        },
      }}
    />
       <Stack.Screen
      name="Parking"
      component={ParkingAlt}
      options={{
        headerTitle: () => <Header name="ParkingAlert" />,
        headerStyle: {
          height: 158,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: "#00e4d0",
          shadowColor: "#000",
          elevation: 25,
        },
      }}
    />
  </Stack.Navigator>
  );
}
export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
});
