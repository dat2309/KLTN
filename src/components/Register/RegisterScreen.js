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
const RegisterScreen = ({ navigation }) => {
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPass, setEnteredPass] = useState("");
    const registerhandler = () => {
        Keyboard.dismiss();
        try {
            const url = "/api/user";
            API.post(url, { userName: enteredPhoneNumber, email: enteredEmail, password: enteredPass }).then(res => {
                console.log(res.data);
                if (res.data.message == "Register is success, active key sent your email")
                    navigation.navigate("Active", { userName: enteredPhoneNumber, email: enteredEmail })
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={{ fontSize: 25, textAlign: "center" }}>SIGN UP NEW ACCOUNT</Text>
                <View style={styles.container2}>
                    <Input
                        onChangeText={(text) => setEnteredPhoneNumber(text)}
                        placeholder="UserName"
                    />
                    <Input
                        onChangeText={(text) => setEnteredEmail(text)}
                        placeholder="Email"

                    />

                    <Input
                        onChangeText={(text) => setEnteredPass(text)}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={registerhandler}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, marginRight: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.ttxt}>HAVE ACCOUNT! LOG IN</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </KeyboardAvoidingView>
    );
};
export default RegisterScreen;
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
        fontSize: 14
    },
});