import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth, db } from "../config";
const Header = (props) => {
  return (
    <View style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize: 25, fontWeight:"bold"}}>{props.name}</Text>
      {/* <TouchableOpacity onPress={() => auth.signOut()} style={styles.button}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity> */}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})