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
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { Button, Input, ListItem, Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
const OneProduct = ({ navigation }) => {
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
    const [coloru, setCloru] = useState(["white", "white", "white"])
    const [size, setSize] = useState("")
    const [tokenn, setTokenn] = useState("")
    const [quantity, setQuantity] = useState(1)
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
    };
    function changeColor0() {
        setCloru(["blue", "white", "white"])
        setSize("S")
    }
    function changeColor1() {
        setCloru(["white", "blue", "white"])
        setSize("M")
    }
    function changeColor2() {
        setCloru(["white", "white", "blue"])
        setSize("L")
    }
    function log() {
        if (size !== "M" && size !== "L" && size !== "S")
            Alert.alert("chọn size")
        if (quantity === 0)
            Alert.alert("chọn số lượng")
        else
            Alert.alert(size + ":   : " + quantity)
    }
    getToken();
    function remo() {
        if (quantity > 0)
            setQuantity(quantity - 1)
        else
            setQuantity(0)
    }
    function add() {
        setQuantity(quantity + 1)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Ionicons name="arrow-back-outline" size={30} style={{ textAlign: "left", marginTop: 60 }} onPress={() => navigation.navigate("ProductScreen")} />
                <ScrollView>

                    <View style={{ alignItems: "center", }}>

                        <Image
                            style={styles.image}
                            source={require("../../image/logo.png")}
                        />
                        <View style={styles.container2}>
                            <Text style={styles.text}>Name</Text>
                            <Text style={styles.text}>1vxJ4GF1fDUzQajshdaksjdlaskjdalsdk;V5PXkcEYVvr01SlGef3k</Text>
                            <Text style={styles.text}>Price</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{
                                    backgroundColor: coloru[0], textAlign: "center",
                                    width: 35,
                                    height: 35,
                                    fontSize: 20,
                                    marginLeft: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    borderRadius: 10,
                                }} onPress={() => changeColor0()}>S</Text>
                                <Text style={{
                                    backgroundColor: coloru[1], textAlign: "center",
                                    width: 35,
                                    height: 35,
                                    fontSize: 20,
                                    marginLeft: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    borderRadius: 10,
                                }} onPress={() => changeColor1()}>M</Text>
                                <Text style={{
                                    backgroundColor: coloru[2], textAlign: "center",
                                    width: 35,
                                    height: 35,
                                    fontSize: 20,
                                    marginLeft: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    borderRadius: 10,
                                }} onPress={() => changeColor2()}>L</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                                <Text style={{ fontSize: 20, marginRight: 20 }}>Số lượng: </Text>
                                <Ionicons name="remove-circle-outline" size={30} onPress={() => remo()}></Ionicons>
                                <Text style={styles.quantity}>{quantity}</Text>
                                <Ionicons name="add-circle-outline" size={30} onPress={() => add()}></Ionicons>

                            </View>


                            <Text style={styles.buttonLogin} onPress={() => log()}>Thêm vào giỏ hàng</Text>

                        </View>
                        <Text style={{ fontSize: 20, color: "black", marginTop: 30 }}>Like Product</Text>
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
            </View >
        </KeyboardAvoidingView >
    );
};

export default OneProduct;
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
        height: 35,
        borderRadius: 25,
        width: "80%",
        marginLeft: 30,
        backgroundColor: "#884EC6",
        justifyContent: "center",
        marginTop: 15,
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20
    },
    buttonLoginText: {
        ...TEXT,
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 30
    },
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
    },
    size: {
        textAlign: "center",
        width: 35,
        height: 35,
        fontSize: 20,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,


    },
    container2: {
        width: "80%",
        marginTop: 50,
        width: "95%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        backgroundColor: "#E5E5E5"
    },
    quantity: {
        textAlign: "center",
        width: 35,
        height: 35,
        fontSize: 20,

        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "white"
    }

});
