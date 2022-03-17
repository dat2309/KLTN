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
    TouchableOpacity, ScrollView
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
import { Button, Input, ListItem } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";


const GetProfile = ({ route, navigation }) => {
    const [tokenn, setTokenn] = useState("")
    const [name, setName] = useState("");

    // setList(route.params.list)

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [id, setId] = useState("");
    const getToken = async () => {
        try {
            const ak = await AsyncStorage.getItem('token')
            if (ak !== null) {
                setTokenn(ak)
                console.log(tokenn)
            }
            const a = await AsyncStorage.getItem('id')
            if (a !== null) {
                setId(a)
                console.log(id)
            }

        }
        catch (e) { }
    }

    const getPro = () => {
        getToken()
        try {
            const url = "/api/user/" + id + "/profile";
            API.get(url, { 'headers': { 'Authorization': tokenn } }).then(res => {
                setName("Name: " + res.data.firstName + " " + res.data.lastName)
                setPhone("Phone: " + res.data.phone)
                setGender("Gender: " + res.data.gender)
            })
        }
        catch (error) {
            console.log(error);
        }


    }
    getPro();


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <ScrollView>
                    <Ionicons name="arrow-back-outline" size={30} style={{ textAlign: "left", marginTop: 60 }} onPress={() => navigation.navigate("Tab")} />
                    <View>
                        <View style={{ alignItems: "center", }}>
                            <Text style={{ fontSize: 25, textAlign: "center", marginTop: 20 }}>Thông tin cá nhân</Text>
                            <View style={styles.container2}>
                                <Text></Text>
                                <Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: "20%", fontSize: 20 }}>Name: </Text>
                                    <Text style={{ backgroundColor: "#E5E5E5", width: "80%", fontSize: 20, borderRadius: 10, textAlign: "center" }} >{route.params.name}</Text></View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ width: "20%", fontSize: 20 }}>Phone: </Text>
                                    <Text style={{ backgroundColor: "#E5E5E5", width: "80%", fontSize: 20, borderRadius: 10, textAlign: "center" }}>{route.params.phone}</Text></View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ width: "20%", fontSize: 20 }}>Gender: </Text>
                                    <Text style={{ backgroundColor: "#E5E5E5", width: "80%", fontSize: 20, borderRadius: 10, textAlign: "center" }}> {route.params.gender}</Text></View>


                                {
                                    route.params.list.map((l, i) => (

                                        <ListItem key={i} style={{ marginLeft: 0, padding: 0 }}>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: -16 }}>
                                                <Text style={{ width: "25%", fontSize: 20, }}>Address: </Text>
                                                <Text style={{ backgroundColor: "#E5E5E5", width: "75%", fontSize: 20, borderRadius: 10, textAlign: "center" }} onPress={() => navigation.navigate("UpdateAddress", { idAdd: l.id })}>{l.street + "," + l.ward + "," + l.district + "," + l.province}</Text>
                                                <Ionicons name="create" size={30} style={{ marginLeft: -25, padding: 0 }} onPress={() => navigation.navigate("UpdateAddress", { idAdd: l.id })} /></View>
                                        </ListItem>
                                    ))
                                }

                                <Text></Text><Text></Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("chưa có")}>
                            <Text style={styles.buttonText}>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                        <Ionicons name="add-circle-outline" size={20} style={{ textAlign: "left", marginTop: 60 }} onPress={() => navigation.navigate("AddAddress")}>Thêm địa chỉ</Ionicons>


                    </View>
                </ScrollView>
            </View >

        </KeyboardAvoidingView >
    );
};
export default GetProfile;
const TEXT = {
    color: "#fff",
    textAlign: "center",
    fontSize: 25
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
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
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
        marginRight: 20,
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
    },
    inputic: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,
        height: 45
    },
    inputStyleic: {
        flex: 1,
    }
});