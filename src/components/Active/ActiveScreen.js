import React, { useState } from "react";
import API from "../../../API";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableOpacity
} from "react-native";
import { Button, Input } from "react-native-elements";
const ActivityScreen = ({ route, navigation }) => {

    const [enteredOTP, setEnteredOTP] = useState("");

    const activehandler = () => {
        if (enteredOTP.length != 6) {
            Alert.alert("Chưa điền đầy đủ thông tin!");
        }
        else {
            Keyboard.dismiss();
            try {
                const url = "/api/user/activation";
                API.post(url, { userName: route.params.userName, activeKey: enteredOTP }).then(res => {
                    console.log(res.data);
                    if (res.data.message == "User actived!")
                        navigation.navigate("Login")
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    const isNotValid = enteredOTP == ''
    const errorMessage = isNotValid ? 'This field is required.' : ''
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>Vui lòng nhập OTP đã được gửi về email</Text>
                    <TextInput
                        style={styles.input}
                        errorMessage={errorMessage}
                        onChangeText={(text) => setEnteredOTP(text)}
                        keyboardType='numeric'
                        placeholder="OTP"
                        maxLength={6}
                        textAlign="center"


                    />
                    <TouchableOpacity style={styles.button} onPress={activehandler}>
                        <Text style={styles.buttonText}>XÁC NHẬN</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </KeyboardAvoidingView>
    );
};
export default ActivityScreen;
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
    container2: {
        marginTop: 50,
        width: "80%",
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 80,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
    },
    textinput: {
        borderWidth: 1,
        borderColor: "#2089dc",
        borderRadius: 50,
        width: "100%",
        marginBottom: 15,
        marginTop: 5,
        alignItems: "flex-end",
    },
    button: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#884EC6",
        justifyContent: "center",
        marginTop: 15,
    },
    buttonText: {
        ...TEXT,
    },
    ttxt: {
        fontWeight: "400",
        fontSize: 18
    },
});