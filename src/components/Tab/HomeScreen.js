import React, { useState, useEffect } from "react";
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
    const [product, setProduct] = useState([""])

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

    function setProducta(a) {
        setProduct(a)
    }
    function getProduct() {
        try {
            const url = "api/product";
            API.get(url).then(res => {

                setProducta(res.data.content)

            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }
    };
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

    useEffect(() => {
        getToken();
        getProduct();
    });

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
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}>
                        <View style={{
                            marginTop: 20, flexDirection: 'row', marginLeft: 30, flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',

                        }}>
                            {
                                product.map((l, i) => (

                                    <ListItem key={i} style={{ width: "50%" }}>

                                        <View style={stylesss.subtitleView}>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate("OneProduct", { idPro: l.id })
                                            }
                                            }>
                                                <Avatar source={{ uri: l.image }} style={stylesss.ratingImage} />
                                                {/* <Image source={require("../../image/logo.png")} style={stylesss.ratingImage} /> */}

                                                <Text>{l.name}</Text>
                                                <Text>{l.price}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </ListItem>
                                ))
                            }
                        </View>
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
        width: "100%",


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
