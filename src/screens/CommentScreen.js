import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView, FlatList, View, StyleSheet } from "react-native";
import {
  Header,
} from "react-native-elements";

import WriteCommentComponent from "../components/WriteCommentComponent";
import ShowCommentComponent from "../components/ShowCommentComponent";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";


const CommentScreen = (props) => {
  // console.log(props);
  const [Comment, setComment]=useState([]);
  const [Render, setRender]=useState(false);

  
  const getComment = async () =>{
    firebase.firestore().collection("posts").doc(props.route.params.postID).onSnapshot(function (doc) {
      let temp_body = doc.data();
      setComment(temp_body.comments.reverse())

    });
    }

    useEffect(()=>{
      getComment();
    },[]);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>
            
            <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog App ", style: { color: "#fff" ,fontSize: 20} }}         
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}/>
 

          <WriteCommentComponent user={props.route.params.currentUser} postID={props.route.params.postID} data={props.route.params.data}/>

          <FlatList
          data={Comment}
          onRefresh={getComment}
          refreshing={Render}
          renderItem={function({item}){
            console.log(item);
            return(
              <ShowCommentComponent com={item} 
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList> 

        </SafeAreaView>
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

export default CommentScreen;