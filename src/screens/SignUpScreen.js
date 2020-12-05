import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements'
import { Fontisto, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';

const SignUpScreen = (props)=>{
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
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
                onPress={function(){
                    if(Name && SID && Email && Password){
                        firebase.auth().createUserWithEmailAndPassword()
                    }
                    else{
                        alert("Fields cannot be empty!");
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

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#e6f1f5"
    }
});

export default SignUpScreen;