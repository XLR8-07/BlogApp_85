import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import moment from "moment";

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postBody, setPostBody] = useState("");

  const getData = async () => {
    await getDataJSON("posts").then((data) => {
      if (data == null) {
        setPostList([]);
      } else setPostList(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
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
              centerComponent={{ text: "Blog App", style: { color: "#fff" } }}
              rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                },
              }}
            />
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={function(currentInput){
                  setPostBody(currentInput); 
               }}
              />
              <Button title="Post" type="outline" onPress={async function () {
                  let arr = [
                    ...postList,
                    {
                      name: auth.CurrentUser.name,
                      email: auth.CurrentUser.email,
                      date: moment().format("DD MMM, YYYY"),
                      likes : [],
                      post: postBody,
                      key: postBody,
                    },
                  ];
  
                  await storeDataJSON("posts", arr).then(() => {
                    setPostList(arr);
                  });
  
                  alert("Post Successful!");
                  setPostBody("");
              }} />
              <Button
              buttonStyle={{ borderColor: "#29435c" }}
              title="Delete Post"
              titleStyle={{ color: "#29435c" }}
              type="outline"
              onPress={async function () {
                await removeData("posts");
              }}
            />
            </Card>
            <FlatList
            data={postList}
            renderItem={(postItem)=>(
              <PostCard
                    author={postItem.item.name}
                    title={postItem.item.date}
                    body={postItem.item.post}
                  />
            )}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;