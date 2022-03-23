import React, { useState } from "react";
import API from "../../../API";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from "react-native-elements";

const LoginScreen = ({ navigation }) => {

    const [enteredName, setEnteredName] = useState("");
    const [enteredPass, setEnteredPass] = useState("");
    const [token, setToken] = useState("");
    const saveToken = async (valuet) => {
        try {
            await AsyncStorage.setItem('token', valuet);
        }
        catch (e) {

        }
    }
    const saveId = async (id) => {
        try {
            await AsyncStorage.setItem('id', id);
        }
        catch (e) {

        }
    }
    const getToken = async () => {
        try {
            const ak = await AsyncStorage.getItem('token')
            if (ak !== null && ak !== "null") {
                console.log(ak)
                console.log("aihih")
            }
            else
                console.log("aaa")
        }
        catch (e) { }
    }
    const getId = async () => {
        try {
            const ak = await AsyncStorage.getItem('id')
            if (ak !== null && ak !== "null") {
                console.log(ak)
                console.log("id")
            }
            else
                console.log("aaa")
        }
        catch (e) { }
    }




    const loginHandler = async () => {
        if (enteredPass === "" || enteredName === "") {
            Alert.alert("Chưa điền đầy đủ thông tin!");

        } else {
            try {
                const url = "/api/user/authentication";
                API.post(url, { userName: enteredName, password: enteredPass }).then(res => {
                    console.log(res.data.id)
                    saveToken(res.data.token)
                    getToken()
                    saveId(res.data.id)
                    console.log(res.data)
                    // if (typeof (res.data.addresses[0]) === 'undefined')
                    //     navigation.navigate("CreateProfile")
                    // else
                    navigation.navigate("Tab")





                    // if (res.data.message == "Register is success, active key sent your email")
                    // console.log("");
                }).catch(e => {

                    Alert.alert("Wrong account or password, please re-enter")
                })
            }
            catch (error) {
                console.log(error);
            }
        }

    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Image
                    style={styles.image}
                    source={require("../../image/logo.png")}
                />
                <View style={styles.container2}>
                    <Input
                        onChangeText={(text) => setEnteredName(text)}
                        placeholder="User Name"
                    />
                    <Input
                        onChangeText={(text) => setEnteredPass(text)}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.buttonLogin} onPress={loginHandler}>
                        <Text style={styles.buttonLoginText}>LOG IN</Text>
                    </TouchableOpacity>


                </View>




                <View style={{ marginTop: 20, marginRight: 150 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
                        <Text style={styles.ttxt}>FORGOT PASSWORD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.ttxt}>SIGN UP NEW ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
const TEXT = {
    color: "#fff",
    textAlign: "center",
};
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    button: {
        padding: 15,
        backgroundColor: "#884EC6"
    },
    ttxt: {
        fontWeight: "400",
        fontSize: 14
    },

    buttonLogin: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#884EC6",
        justifyContent: "center",
        marginTop: 15,
    },
    buttonLoginText: {
        ...TEXT,
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 10
    },
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    container2: {
        width: "80%",
        marginTop: 50,
    },
});
