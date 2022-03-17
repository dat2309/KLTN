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
    ScrollView,
    SafeAreaView,
} from "react-native";

import { Button, Input, ListItem, Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }) => {


    const [list, setList] = useState([{
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy ',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman'
    },
    ]);
    console.log(list);

    const [enteredName, setEnteredName] = useState("");
    const [enteredPass, setEnteredPass] = useState("");
    const [tokenn, setTokenn] = useState("")
    const getToken = async () => {
        try {
            const ak = await AsyncStorage.getItem('token')
            if (ak !== null && ak !== "null") {
                setTokenn(ak)
            }
            else
                setTokenn("null")
        }
        catch (e) { }
    }
    getToken();
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
                }).catch(e => {
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView >
                <View style={styles.container}>

                    <Image
                        style={styles.image}
                        source={require("../../image/logo.png")}
                    />

                    <Text style={{ fontSize: 30, color: "red" }}>Wellcom to DEVT</Text>
                    <Text style={{ fontSize: 20, color: "black", marginTop: 80 }}>New Product</Text>
                    <View style={{
                        marginTop: 20, flexDirection: 'row', marginLeft: 50, flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',

                    }}>
                        {
                            list.map((l, i) => (

                                <ListItem key={i} style={{ width: "50%" }}>

                                    <View style={stylesss.subtitleView}>
                                        <TouchableOpacity onPress={() => {
                                            getToken()
                                            console.log(tokenn)
                                        }
                                        }>
                                            {/* <Avatar source={{ uri: l.avatar_url }} style={stylesss.ratingImage} /> */}
                                            <Image source={require("../../image/logo.png")} style={stylesss.ratingImage} />

                                            <Text>{l.name}</Text>
                                            <Text>{l.subtitle}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </ListItem>
                            ))
                        }
                    </View>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;
const stylesss = StyleSheet.create({
    subtitleView: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,


    },
    ratingImage: {
        height: 100,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
})
const TEXT = {
    color: "#fff",
    textAlign: "center",
};
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        // justifyContent: "center",
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
