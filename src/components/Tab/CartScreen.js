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
import { Button, Input } from "react-native-elements";

const CartScreen = ({ navigation }) => {

    const [enteredName, setEnteredName] = useState("");
    const [enteredPass, setEnteredPass] = useState("");

    const loginHandler = async () => {
        if (enteredPass === "" || enteredName === "") {
            Alert.alert("Chưa điền đầy đủ thông tin!");

        } else {
            try {
                const url = "/api/user/authentication";
                API.post(url, { userName: enteredName, password: enteredPass }).then(res => {
                    console.log(res.data);
                    navigation.navigate("CreateProfile", { token: res.data.token });
                    // Alert.alert(res.data.token);
                    // if (res.data.message == "Register is success, active key sent your email")
                    // console.log("");
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
                        <Text style={styles.buttonLoginText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>


                </View>




                <View style={{ marginTop: 20, marginRight: 150 }}>
                    <TouchableOpacity onPress={() => Alert.alert("Quên MK")}>
                        <Text style={styles.ttxt}>QUÊN MẬT KHẨU</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.ttxt}>ĐĂNG KÝ </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CartScreen;
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
