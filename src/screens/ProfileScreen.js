import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign } from '@expo/vector-icons';

import { removeData } from '../functions/AsyncStorageFunctions';


const ProfileScreen = (props) => {
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
                        centerComponent={{ text: "The Office", style: { color: "#fff" } }}
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
                        <Text style={styles.userNameStyle}>{auth.CurrentUser.name}</Text>
                        <Button
                            icon={<AntDesign name="deleteuser" size={24} color="white" />}
                            title=" Delete Profile"
                            onPress={async function () {
                                await removeData(auth.CurrentUser.email);
                                alert("Account has been deleted!");
                                auth.setCurrentUser({});
                                auth.setIsLoggedIn(false);
                            }}
                        />
                        <Text style={styles.textStyle}>Born on: {auth.CurrentUser.dateOfBirth}</Text>
                        <Text style={styles.textStyle}>Address: {auth.CurrentUser.address}</Text>
                        <Text style={styles.textStyle}>Works at: {auth.CurrentUser.workPlace}</Text>
                    </Card>
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