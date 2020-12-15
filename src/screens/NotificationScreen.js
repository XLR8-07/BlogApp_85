import React, { useState ,useEffect} from "react";
import {ImageBackground, FlatList, View, StyleSheet } from "react-native";
import { Header} from "react-native-elements";
import {getDataJSON, getAllindex} from '../functions/AsyncStorageFunctions';
import NotificationComponent from '../components/NotificationComponent';
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  const [Notification, setNotification]=useState([]);
  const [Render, setRender]=useState(false);

  const getNotification = async () =>{
    setRender(true);
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNotification(temp_posts);
        setRender(false);
      })
      .catch((error) => {
        setRender(false);
        alert(error);
      });
  }


  useEffect(()=>{
     getNotification();
  },[]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
            <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog App", style: { color: "#fff" ,fontSize: 20} }}         
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}/>
          
          <FlatList
          data={Notification}
          onRefresh={getNotification}
          refreshing={Render}
          renderItem={function({item}){
            if(item.data.author==auth.CurrentUser.displayName){
              return(
                  <NotificationComponent content={item} link={props.navigation} likes={item.data.likes} comments={item.data.comments} currentUser={auth.CurrentUser.displayName}/>
            );}
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList> 
          
        </View>
      )}
    </AuthContext.Consumer>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center"
},
});

export default NotificationScreen;