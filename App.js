import 'expo-dev-client';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header.js";
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
import {auth} from "./config.js";
import notifee from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging";
function App() {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const Stack = createStackNavigator();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const sub = () =>{
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }
  useEffect(() => {
    sub();

    if (requestUserPermission()) {
      //return fcm token for the device
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Failed token status", authStatus);
    }
    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          const channelId = await notifee.createChannel({
            id: '1',
            name: 'Maya Channel',
          });
          const uns= JSON.stringify(remoteMessage.data);
          const res = JSON.parse(uns)
          await notifee.displayNotification({
            title: res.title,
            body: res.body,
            contact: res.mobile,
            android: {
              channelId,
               // Local image
               largeIcon: require('./assets/user.png'),
               sound: 'hollow',
              // Absolute file path
              // largeIcon: file:///xxxx/xxxx/xxxx.jpg,
          
              // Android resource (mipmap or drawable)
              // largeIcon: 'large_icon',
            },
          });
         
          Alert.alert('A new FCM message arrived!', res.title);
          // const obj = JSON.stringify(remoteMessage.data)
          // console.log('Notification caused app to open from quit state:', obj);
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
    // // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        const channelId = await notifee.createChannel({
          id: '1',
          name: 'Maya Channel',
        });
        const uns= JSON.stringify(remoteMessage.data);
        const res = JSON.parse(uns)
        await notifee.displayNotification({
          title: res.title,
          body: res.body,
          contact: res.mobile,
          android: {
            channelId,
             // Local image
             largeIcon: require('./assets/user.png'),
             sound: 'hollow',
            // Absolute file path
            // largeIcon: file:///xxxx/xxxx/xxxx.jpg,
        
            // Android resource (mipmap or drawable)
            // largeIcon: 'large_icon',
          },
        });
      console.log(
        "Notification caused app to open from background state:",
        res.title
      );
      }
      // navigation.navigate(remoteMessage.data.type);
    });
    // // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
       const uns= JSON.stringify(remoteMessage.data)
      await notifee.displayNotification({
        title: JSON.parse(uns).title,
        body: JSON.parse(uns).body,
        contact: JSON.parse(uns).mobile,
        android: {
          channelId,
           // Local image
           largeIcon: require('./assets/user.png'),
      
          // Absolute file path
          // largeIcon: file:///xxxx/xxxx/xxxx.jpg,
      
          // Android resource (mipmap or drawable)
          // largeIcon: 'large_icon',
        },
      });
     
      
      const obj = JSON.stringify(remoteMessage.data)
      console.log('Message handled in the background!', obj);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: '1',
        name: 'Maya Channel',
      });
      const uns= JSON.stringify(remoteMessage.data);
      const res = JSON.parse(uns)
      await notifee.displayNotification({
        title: res.title,
        body: res.body,
        contact: res.mobile,
        android: {
          channelId,
           // Local image
           largeIcon: require('./assets/user.png'),
           sound: 'hollow',
          // Absolute file path
          // largeIcon: file:///xxxx/xxxx/xxxx.jpg,
      
          // Android resource (mipmap or drawable)
          // largeIcon: 'large_icon',
        },
      });
     
     // Alert.alert('A new FCM message arrived!', res.title);
    });
     return unsubscribe;
   
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
