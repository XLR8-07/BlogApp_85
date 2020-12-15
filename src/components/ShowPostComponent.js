import React, { useState ,useEffect}  from "react";
import { AsyncStorage } from 'react-native';
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import {storeDataJSON, mergeData, removeData} from '../functions/AsyncStorageFunctions';
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

const ShowPostComponent = (props) => {
  const [Like, setLike] = useState(props.data.likes.length);
  let like = " (" + Like + ")";
  const comment="Comment";
  
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
        <Text h6Style={{ padding: 10}} h6 style={{alignSelf:"stretch",color:'gray'}}>
          <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted at: </Text>{props.data.created_at.toDate().toDateString().toString()}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.data.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={like} 
          icon={<AntDesign name="heart" size={24} color="dodgerblue" />}
          onPress={
            function(){
              firebase.firestore().collection("posts").doc(props.postID).update({
                likes: firebase.firestore.FieldValue.arrayUnion(props.currentUser)
              });
              }
        }
        />
        <Button type="solid" title={comment} onPress={
          function(){
            props.props.navigation.navigate('Comment',{data:props.data,currentUser:props.currentUser,postID:props.postID});
          }
        }/>
      </View>
    </Card>
  );
};

export default ShowPostComponent;