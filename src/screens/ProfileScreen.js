import React,{ useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, Image,FlatList } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign } from '@expo/vector-icons';
import ShowPostComponent from "../components/ShowPostComponent";
import * as firebase from "firebase";
import "firebase/firestore";



const ProfileScreen = (props) => {

    const [Posts,setPosts] = useState([]);
    const [Profiles,setProfiles] = useState([]);
    const [Render , setRender] = useState(false); 

    const getData = async() =>{
        firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
            let temp_users = [];
            querySnapshot.forEach((doc) => {
                temp_users.push({
                    id: doc.id,
                    data: doc.data(),
                });
        });
        setProfiles(temp_users);
        //setLoading(false);
      }
        , (error) => {
          //setLoading(false);
          alert(error);
        });
    }

    const getPost = async() =>{
        firebase
      .firestore()
      .collection("posts")
      .orderBy("posted_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_users = [];
        querySnapshot.forEach((doc) => {
          temp_users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_users);
        //setLoading(false);
      }
        , (error) => {
          //setLoading(false);
          alert(error);
        });
    }

    useEffect(()=>{
        getPost();
        getData();
    },[])
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
                        <Image style={styles.profImage} source={require('../../assets/profilePhoto.png')} />
                        <Text style={styles.userNameStyle}>{auth.CurrentUser.displayName}</Text>
                        <Button
                            type="solid"
                            title=" Edit Account "
                            icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
                            onPress={
                                function(){
                                    props.navigation.navigate('EditProfile',{title:auth.CurrentUser});
                                }
                            }
                        />
                        <Button
                            icon={<AntDesign name="deleteuser" size={24} color="white" />}
                            title=" Delete Profile"
                            onPress={async function () {
                                firebase.auth().deleteUser(auth.CurrentUser.uid).then(() => {
                                    console.log('Successfully deleted user');
                                    auth.setIsloggedIn(false);
                                    auth.setCurrentUser({});
                                }).catch((error) => {
                                    console.log('Error deleting user:', error);
                                  });
                                }
                            }
                        />
                        <FlatList
                            data={Profiles}
                            renderItem={function ({ item }) {
                            console.log(item);
                            if (auth.CurrentUser.uid == item.id) {
                                return (
                                <View>
                                    <Text style={styles.textStyle1}>  Born On :  {item.data.dateOfBirth}</Text>
                                    <Text style={styles.textStyle1}>  Lives At :  {item.data.address}</Text>
                                    <Text style={styles.textStyle1}>  Works At :  {item.data.workPlace}</Text>
                                </View>
                    );
                  }
                }}
              />
                    </Card>
                    <Card>
                        <Text style={{ fontSize: 18, color: 'dodgerblue', textAlign: 'center' }}>↓ ↓ ↓ Your Posts ↓ ↓ ↓</Text>
                    </Card>

                    <FlatList
                        data={Posts}
                        onRefresh={getPost}
                        refreshing={Render}
                        renderItem={function ({ item }) {
                
                            console.log(item);
                            if (item.data.userId == auth.CurrentUser.uid) {
                            return (
                                <ShowPostComponent data={item.data} postID={item.id} currentUser={auth.CurrentUser.displayName} props={props} />
                            );
                            }
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
        fontSize: 20,
        alignSelf: 'flex-start',
        color: '#292D3E',
        marginTop: 15,
    },

    viewStyle: {
        flex: 1,
    },
    userNameStyle: {
        fontSize: 30,
        alignSelf: 'center',
        color: '#1B1E2B',
        marginBottom: 20,
    },
    profImage: {
        width: 250,
        height: 250,
        marginBottom: 20,
        borderColor: 'black',
        borderRadius : 250/2,
        overflow: "hidden",
        borderWidth: 2,
        alignSelf: 'center',
    },
});

export default ProfileScreen;