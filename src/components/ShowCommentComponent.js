import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";

const ShowCommentComponent = (props) => {
  console.log(props.com.time);
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text h4Style={{ padding: 10 }} h4>
        {props.com.commentor}
        </Text>
        <Text h6Style={{ padding: 10}} h6 style={{alignSelf:"flex-end", color:'gray'}}>
           {props.com.time.toDate().toDateString().toString()} 
        </Text>
        </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.com.message}
      </Text>
    </Card>
  );
};

export default ShowCommentComponent;