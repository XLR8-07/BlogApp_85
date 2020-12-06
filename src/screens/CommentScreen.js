import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView, FlatList, View, StyleSheet } from "react-native";
import {
  Header,
} from "react-native-elements";

import WriteCommentComponent from "../components/WriteCommentComponent";
import ShowCommentComponent from "../components/ShowCommentComponent";
import {getDataJson, getAllindex} from '../functions/AsyncStorageFunctions';
import { AuthContext } from "../providers/AuthProvider";
import * as  firebase from "firebase";
import "firebase/firestore";


const CommentScreen = (props) => {
  const content=props.route.params.content;

  const [Comment, setComment]=useState([]);
  const [Render, setRender]=useState(false);
  const getComment = async () =>{
    setRender(true);
    
    firebase
    .firestore()
    .collection('posts')
    .doc(props.id)
    .get()
    .then((querySnapShot)=>{
      let temp_comments = [];
      querySnapShot.forEach((doc)=>{
        temp_comments.push({
          id : doc.id,
          data : doc.data
        });
      });
      setComment(temp_comments); 
      setRender(false);
    })
    .catch((error)=>{
      setRender(false);
      alert(error);

    })
    // let keys=await getAllindex();
    // let Allcomments=[];
    // if(keys!=null){
    //   for (let k of keys){
    //       if(k.startsWith("cid#") && k.endsWith(content.pid)){
    //         let comments= await getDataJson(k);
    //         Allcomments.push(comments);
    //       }
    //     }
    //     setComment(Allcomments);
    //   }
    //   else{
    //     console.log("No post to show");
    //   }
    //   setRender(false);
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
 

          <WriteCommentComponent user={auth.CurrentUser} postcontent={Comment}/>

          <FlatList
          data={Comment}
          onRefresh={getComment}
          refreshing={Render}
          renderItem={function({item}){
            return(
              <ShowCommentComponent title={item}
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