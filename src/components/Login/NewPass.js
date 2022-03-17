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

const NewPass = ({ navigation }) => {

    const [enteredName, setEnteredName] = useState("");
    const [enteredPass, setEnteredPass] = useState("");
    const [code, setCode] = useState("")

    const accpet = async () => {
        if (enteredPass === "" || enteredName === "" || code === "") {
            Alert.alert("Chưa điền đầy đủ thông tin!");

        } else {
            try {
                const url = "api/user/password";
                API.patch(url, { userName: enteredName, newPassword: enteredPass, resetPasswordCode: code }).then(res => {
                    console.log(res.status)
                    if (res.status === 400)
                        console.log("ghkj;")
                    console.log(res.data.message)
                    if (res.data.message === "Password changed!!!!")
                        navigation.navigate("Login")
                    else
                        Alert.alert("Vui lòng nhập lại")

                }).catch(e => {
                    if (e.response.status === 400)
                        Alert.alert("Vui lòng nhập lại")
                })
            }
            catch (error) {
                console.log(e)
            }
        }

    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>


                <View style={styles.container2}>
                    <Input
                        onChangeText={(text) => setEnteredName(text)}
                        placeholder="User Name"
                    />
                    <Input
                        onChangeText={(text) => setEnteredPass(text)}
                        placeholder="New Password"
                        secureTextEntry={true}
                    />
                    <Input

                        onChangeText={(text) => setCode(text)}
                        keyboardType='numeric'
                        placeholder="Code"
                        maxLength={6}



                    />
                    <TouchableOpacity style={styles.buttonLogin} onPress={accpet}>
                        <Text style={styles.buttonLoginText}>Xác Nhận</Text>
                    </TouchableOpacity>


                </View>





            </View>
        </KeyboardAvoidingView>
    );
};

export default NewPass;
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
