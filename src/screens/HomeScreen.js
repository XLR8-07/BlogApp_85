import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView,TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import ShowPostComponent from "../components/ShowPostComponent";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";


const HomeScreen = (props) => {

  const [Post, setPost]=useState([]);
  const [Render, setRender]=useState(false);

  const [postBody , setPostBody] = useState('');
  
  const getPost = async () =>{
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
        setPost(temp_posts);
        setRender(false);
      })
      .catch((error) => {
        setRender(false);
        alert(error);
      });
  }

  useEffect(()=>{
    getPost();
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

            <Card>
            <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="gray" />}
                onChangeText={
                function(currentinput){
                        setPostBody(currentinput);
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
                        body: postBody,
                        author: auth.CurrentUser.displayName,
                        created_at: firebase.firestore.Timestamp.now(),
                        likes: [],
                        comments: [],
                      })
                      .then(() => {
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

          <FlatList
          data={Post}
          onRefresh={getPost}
          refreshing={Render}
          renderItem={function({item}){
            return(
              <ShowPostComponent data={item.data} postID={item.id} currentUser={auth.CurrentUser.displayName} props={props}/>
            );
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

export default HomeScreen;