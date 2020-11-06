import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { getDataJSON } from "../functions/AsyncStorageFunctions";

const PostCard = (props) => {

  const [likeCounter,setlikeCounter] = useState(0);
  const [CommentCounter, setCommentCounter] = useState(0);

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
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title="   Like (17)"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
          onPress={
            async function(){
              const response = await getDataJSON();
            }
          }
        />
        <Button type="solid" 
        title= "  Comment (10)"
        onPress={
          function(){
            setCommentCounter(CommentCounter+1);
          }
        }
        />
      </View>
    </Card>
  );
};

export default PostCard;
