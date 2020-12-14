import React,{useReducer, useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import {storeDataJSON, mergeData} from '../functions/AsyncStorageFunctions';
import { AuthContext } from "../providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";


const WriteCommentComponent = (props) => {
    console.log(props);
    const [comment , setComment] = useState('');
    let temp_comments = [];

  return (
    
    <Card>
    <View style={{flexDirection: "row",alignItems: "center"}}>
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "white" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
         {props.data.author} 
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{alignSelf:"stretch", color:'gray'}}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted at: </Text>{props.data.created_at.toDate().toDateString().toString()}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.data.body}
      </Text>
      <Text h6Style={{ padding: 10 }} h6 style={{color:'gray'}}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Likes: </Text>{props.data.likes.length.toString()} 
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}> , Comments: </Text>{props.data.comments.length.toString()}
        </Text>
    <Card.Divider />
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{width:"75%"}}>
    <Input

        placeholder="Write Something"
        leftIcon={<Entypo name="pencil" size={24} color="gray" />}
        onChangeText={
        function(currentinput){
                setComment(currentinput);
        }
    }
    />
    </View>
    <View style={{width:"25%",justifyContent: "center",marginBottom:20}}>
    <Button title="Comment" type="solid" onPress={
        async function(){
            temp_comments = props.data.comments;
            temp_comments.push(comment);
            console.log(temp_comments);
            firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .update({ 
              comments: firebase.firestore.FieldValue.arrayUnion({
                commentor: props.user,
                message: comment,
                time: firebase.firestore.Timestamp.now(),
              })
            })

        
        }
    } />
    </View>
    </View>
  </Card>

  );
};

export default WriteCommentComponent;