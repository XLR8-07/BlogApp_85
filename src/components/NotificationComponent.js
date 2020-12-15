import React from "react";
import { View,TouchableOpacity , FlatList} from "react-native";
import { Card, Text, Avatar } from "react-native-elements";
import {getDataJSON} from '../functions/AsyncStorageFunctions';

const NotificationComponent = (props) => {
  console.log(props.content.data);
  
  let notation;
  let bcolor;
  let nm;
  notation="Commented to";
  bcolor="#ffab91";
  nm="pencil";
  
  return (
    <TouchableOpacity onPress={function(){
      props.link.navigate('Comment',{data:props.content.data,currentUser:props.currentUser,postID:props.content.id});
    }}>
    <Card>
    <Text style={{ fontStyle: "italic", fontSize: 20 }}>{props.content.data.body}</Text>

      <FlatList
            data={props.content.data.comments}
            renderItem={function ({ item }) {
              return (
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4, marginTop: 5 }}>
                  <Avatar
                    containerStyle={{ backgroundColor: '#0D75E7' }}
                    rounded
                    icon={{
                      name: 'pencil',
                      type: "font-awesome",
                      color: "white",
                      size: 18,
                    }}
                    activeOpacity={1}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <Text style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{item.commentor} </Text> Commented on This Post.
                    </Text>
                </View>

              );
            }
            }
          />

          <FlatList
            data={props.content.data.likes}
            renderItem={function ({ item }) {
              return (
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4, marginTop: 5 }}>
                  <Avatar
                    containerStyle={{ backgroundColor: '#de507d' }}
                    rounded
                    icon={{
                      name: 'heart',
                      type: "font-awesome",
                      color: "white",
                      size: 18,
                    }}
                    activeOpacity={1}
                  />
                  <Text style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{item} </Text> Liked This Post.
                    </Text>
                </View>

              );
            }
            }
            keyExtractor={(item, index) => index.toString()}
          />
  </Card>
  </TouchableOpacity>
  );
} 

export default NotificationComponent;