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
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";

const UpdateAddress = ({ route, navigation }) => {
    const [tokenn, setTokenn] = useState("")
    const [enteredStreet, setEnteredStreet] = useState("");
    const [enteredProvince, setEnteredProvince] = useState("");
    const [enteredDistrict, setEnteredDistrict] = useState("");
    const [enteredWard, setEnteredWard] = useState("");
    const [id, setId] = useState("");
    const getToken = async () => {
        try {
            const ak = await AsyncStorage.getItem('token')
            if (ak !== null) {
                setTokenn(ak)
                console.log(ak)
            }
            const a = await AsyncStorage.getItem('id')
            if (a !== null) {
                setId(a)
                console.log("aihih")
            }

        }
        catch (e) { }
    }

    const update = () => {
        getToken()
        Keyboard.dismiss();
        try {
            if (!enteredStreet.trim())
                Alert.alert("Error", 'Please Enter Street');
            else if (!enteredProvince.trim())
                Alert.alert("Error", 'Please Enter Province');
            else if (!enteredDistrict.trim())
                Alert.alert("Error", 'Please Enter District');
            else if (!enteredWard.trim())
                Alert.alert("Error", 'Please Enter Ward');
            else {
                try {
                    const url = "api/user/" + id + "/profile/address/" + route.params.idAdd;
                    console.log(url)
                    API.put(url, {
                        street: enteredStreet,
                        province: enteredProvince,
                        district: enteredDistrict,
                        ward: enteredWard
                    }, { 'headers': { 'Authorization': tokenn } }).then(res => {
                        console.log(res.data)
                        navigation.navigate("Tab")





                    }).catch(e => {

                        console.log(e)
                    })
                }
                catch (error) {
                    console.log(error);
                }

                console.log(enteredStreet);
                console.log(enteredProvince);
                console.log(enteredDistrict);
                console.log(enteredWard);
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
                <Ionicons name="arrow-back-outline" size={30} style={{ textAlign: "left", marginTop: 60 }} onPress={() => navigation.navigate("Tab")} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 25, textAlign: "center" }}>Update Address</Text>
                    <View style={styles.container2}>
                        <Input
                            onChangeText={(text) => setEnteredStreet(text)}
                            placeholder="Street"

                        />
                        <Input
                            onChangeText={(text) => setEnteredWard(text)}
                            placeholder="Ward "

                        />

                        <Input
                            onChangeText={(text) => setEnteredDistrict(text)}
                            placeholder="District"

                        />

                        <Input
                            onChangeText={(text) => setEnteredProvince(text)}
                            placeholder="Province"

                        />
                        <TouchableOpacity style={styles.button} onPress={update}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};
export default UpdateAddress;
const TEXT = {
    color: "#fff",
    textAlign: "center",
};
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        backgroundColor: "white",
    },
    container2: {

        marginTop: 50,
        width: "95%",
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
        marginTop: 15, marginRight: 20,
        marginLeft: 20
    },
    buttonText: {
        ...TEXT,
    },
    ttxt: {
        fontWeight: "400",
        fontSize: 14
    },
    texth: {
        fontSize: 25, textAlign: "left", marginTop: 20, borderWidth: 0.5, width: "100%",
        borderRadius: 10,
    }
});