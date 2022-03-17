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

const ForgotPass = ({ navigation }) => {

    const [enteredName, setEnteredName] = useState("");

    const forgot = async () => {

        try {
            const url = "api/user/recovery?userName=" + enteredName;
            API.get(url).then(res => {

                console.log(res.data)
                // if (typeof (res.data.addresses[0]) === 'undefined')
                navigation.navigate("NewPass")
                // else





                // if (res.data.message == "Register is success, active key sent your email")
                // console.log("");
            }).catch(e => {
                console.log(e.response.status)
                if (e.response.status === 400)
                    Alert.alert("Vui lòng nhập lại")
            })
        }
        catch (error) {
            console.log(error);
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

                    <TouchableOpacity style={styles.buttonLogin} onPress={forgot}>
                        <Text style={styles.buttonLoginText}>Quên Mật Khẩu </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ForgotPass;
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
