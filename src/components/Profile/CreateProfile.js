import React, { useState } from "react";
import API from "../../../API";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Div,
    TextInput,
    Alert,
    Keyboard,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";

const CreateProfile = ({ navigation }) => {
    const genderSelec = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },

    ];
    const [tokenn, setTokenn] = useState("")
    const [enteredFName, setEnteredFname] = useState("");
    const [enteredLName, setEnteredLName] = useState("");
    const [enteredPhone, setEnteredPhone] = useState("");
    const [enteredGender, setEnteredGender] = useState("");
    const [id, setId] = useState("");
    const getToken = async () => {
        try {
            const ak = await AsyncStorage.getItem('token')
            if (ak !== null) {
                setTokenn(ak)
                console.log("aihih")
            }
            const a = await AsyncStorage.getItem('id')
            if (a !== null) {
                setId(a)
                console.log("aihih")
            }

        }
        catch (e) { }
    }

    const create = () => {
        getToken();



        Keyboard.dismiss();
        try {
            if (!enteredFName.trim())
                Alert.alert("Error", 'Please Enter First Name');
            else if (!enteredLName.trim())
                Alert.alert("Error", 'Please Enter Last Name');
            else if (enteredPhone.length != 10)
                Alert.alert("Error", 'Please Enter Phone');
            else {
                try {
                    const url = "/api/user/" + id + "/profile";
                    API.post(url, {
                        firstName: enteredFName,
                        lastName: enteredLName,
                        phone: enteredPhone,
                        gender: enteredGender
                    }, { 'headers': { 'Authorization': tokenn } }).then(res => {
                        console.log(res.data)
                        navigation.navigate("AddAddress")




                    })
                }
                catch (error) {
                    console.log(error);
                }


                console.log(tokenn)
                console.log(enteredFName);
                console.log(enteredLName);
                console.log(enteredPhone);
                console.log(enteredGender);
            }
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
                <Text style={{ fontSize: 25, textAlign: "center" }} >INFORMATION REGISTRATION</Text>
                <View style={styles.container2}>
                    <Input
                        onChangeText={(text) => setEnteredFname(text)}
                        placeholder="First Name"

                    />
                    <Input
                        onChangeText={(text) => setEnteredLName(text)}
                        placeholder="Last Name "

                    />

                    <Input
                        onChangeText={(text) => setEnteredPhone(text)}
                        placeholder="Phone"
                        keyboardType='numeric'


                    />


                    <SwitchSelector
                        selectedColor="red"
                        accessibilityLabel="Gender"
                        options={genderSelec}
                        initial={-1}
                        hasPadding
                        borderColor='#2089dc'
                        title="Gender"

                        onPress={value => setEnteredGender(value)}
                    />

                    <TouchableOpacity style={styles.button} onPress={create}>
                        <Text style={styles.buttonText} onPress={create}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </KeyboardAvoidingView>
    );
};
export default CreateProfile;
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