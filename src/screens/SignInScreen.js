import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements'
import { Fontisto, AntDesign, FontAwesome } from '@expo/vector-icons'; 
import {AuthContext} from '../providers/AuthProvider';
import {getDataJSON} from "../functions/AsyncStorageFunctions";

const SignInScreen = (props)=>{
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        <AuthContext.Consumer>
             {(auth)=>(<View style={styles.viewStyle}>
                <Card>
                    <Card.Title>Welcome to BlogApp</Card.Title>
                    <Card.Divider></Card.Divider>
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
                        icon={<AntDesign name="login" size={24} color="black"/>}
                        title='Sign In!'
                        type='outline'
                        onPress={async function () {
                            let UserData = await getDataJSON(Email);
                            if (UserData.password == Password) {
                              auth.setIsLoggedIn(true);
                              auth.setCurrentUser(UserData);
                              alert('Login Successful');
                            } else {
                              alert("Login Failed");
                              console.log(UserData);
                            }
                          }}
                    />
                    <Button
                    title=" Don't have an account?"
                    icon={<AntDesign name="user" size={24} color="dodgerblue"/>}
                    onPress={
                        function(){
                            props.navigation.navigate('SignUp');
                        }
                    }
                    type='clear'
                    />
                </Card>
            </View>)}
        </AuthContext.Consumer>
       
    )
};

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#e6f1f5"
    }
});

export default SignInScreen;