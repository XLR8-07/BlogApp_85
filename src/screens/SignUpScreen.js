import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements'
import { Fontisto, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from '../components/Loading';

const SignUpScreen = (props)=>{
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if(isLoading){
      return (<Loading/>)
    }
    else{

    return(
        <View style={styles.viewStyle}>
            <Card>
                <Card.Title>Welcome to BlogApp</Card.Title>
                <Card.Divider></Card.Divider>
                <Input
                leftIcon={<AntDesign name="user" size={24} color="black" />}
                placeholder='Name'
                onChangeText={function(currentInput){
                   setName(currentInput); 
                }}
                />
                <Input
                leftIcon={<AntDesign name="idcard" size={24} color="black" />}
                placeholder='Student ID'
                onChangeText={function(currentInput){
                    setSID(currentInput); 
                 }}
                />
                <Input
                leftIcon={<Fontisto name="email" size={24} color="black" />}
                placeholder='Email'
                onChangeText={function(currentInput){
                    setEmail(currentInput); 
                 }}
                />
                <Input
                leftIcon={<AntDesign name="key" size={24} color="black" />}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={function(currentInput){
                    setPassword(currentInput); 
                 }}
                />
                <Button
                icon={<Octicons name="sign-in" size={24} color="black" />}
                title='Sign Up!'
                type='outline'
                onPress={() => {
                    if (Name && SID && Email && Password) {
                      setIsLoading(true);
                      firebase.auth().createUserWithEmailAndPassword(Email, Password).then((userCreds) => {
                          userCreds.user.updateProfile({ displayName: Name });
                          firebase.firestore().collection("users").doc(userCreds.user.uid).set({
                              name: Name,
                              sid: SID,
                              email: Email,
                            })
                            .then(() => {
                              setIsLoading(false);
                              alert("Account created successfully! \nUID: " + userCreds.user.uid);
                              props.navigation.navigate("SignIn");
                            })
                            ,(error1) => {
                              setIsLoading(false);
                              alert(error1);
                            };
                        })
                        ,(error2) => {
                          setIsLoading(false);
                          alert(error2);
                        };
                    } else {
                      alert("Fields can not be empty!");
                    }
                  }}
                />

                <Button
                title=" Already have an account?"
                icon={<FontAwesome name="sign-in" size={24} color="black" />}
                onPress={
                    function(){
                        props.navigation.navigate('SignIn');
                    }
                }
                type='clear'
                />
            </Card>
        </View>
    )
 }
}

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#e6f1f5"
    }
});

export default SignUpScreen;