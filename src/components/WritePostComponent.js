import React,{useReducer, useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider"
import * as firebase from "firebase";
import "firebase/firestore";


const WritePostComponent = (props) => {
    // console.log(props)
    const [Post, setPost]=useState("");
    
    let today = new Date().toLocaleDateString();
    let currenttime = new Date().toLocaleTimeString();
  return (
    <AuthContext.Consumer>
    {(auth)=>{
        <Card>
        <Input

            placeholder="What's On Your Mind?"
            leftIcon={<Entypo name="pencil" size={24} color="gray" />}
            onChangeText={
            function(currentinput){
                    setPost(currentinput);
            }
        }
        />
        <Button title="Post" type="outline" onPress={
            function(){
                firebase
                      .firestore()
                      .collection("posts")
                      .add({
                        userId: auth.CurrentUser.uid,
                        body: Post,
                        author: auth.CurrentUser.displayName,
                        created_at: firebase.firestore.Timestamp.now(),
                        likes: [],
                        comments: [],
                      })
                      .then(() => {
                        console.log("HERE!");
                        // setLoading(false);
                        alert("Post created Successfully!");
                      })
                      .catch((error) => {
                        // setLoading(false);
                        alert(error);
                      });
            // setPost("");
            // input.current.clear(); 
            }
        } />
      </Card>
    }}
    </AuthContext.Consumer>
  );
};

export default WritePostComponent;
