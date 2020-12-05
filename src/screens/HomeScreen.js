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
import WritePostComponent from "../components/WritePostComponent";;
import {getDataJSON, getAllindex} from '../functions/AsyncStorageFunctions';
import { AuthContext } from "../providers/AuthProvider"


const HomeScreen = (props) => {

  const [Post, setPost]=useState([]);
  const [Render, setRender]=useState(false);
  const getPost = async () =>{
    setRender(true);
    let keys=await getAllindex();
    let Allposts=[];
    if(keys!=null){
      for (let k of keys){
          if(k.startsWith("pid#")){
            let post= await getDataJSON(k);
            Allposts.push(post);
          }
        }
        setPost(Allposts);
      }
      else{
        console.log("No post to show");
      }
      setRender(false);
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

          
          <WritePostComponent user={auth.CurrentUser}/>

          <FlatList
          data={Post}
          onRefresh={getPost}
          refreshing={Render}
          renderItem={function({item}){
            return(
              <ShowPostComponent title={item} user={auth.CurrentUser} link={props.navigation}
              />
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