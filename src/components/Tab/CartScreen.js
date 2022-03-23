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
} from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { Button, Input, ListItem, Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolate } from "react-native-reanimated";
const CartScreen = ({ navigation }) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [enteredPass, setEnteredPass] = useState("");
    const [cartItem, setCartItem] = useState([])
    const [list, setList] = useState([{

        name: 'Amy ',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice President',
        tag: "S",
        quantity: 1,
        proId: "132154adasd",
        price: 1
    },
    {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman',
        tag: "S",
        quantity: "1",
        proId: "132154adasd",
        price: 1
    }, {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman',
        tag: "S",
        quantity: "1",
        proId: "132154adasd",
        price: "5400"
    },
    {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman',
        tag: "S",
        quantity: "1",
        proId: "132154adasd",
        price: "5400"
    }, {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman',
        tag: "S",
        quantity: "1",
        proId: "132154adasd",
        price: "5400"
    },
    ]);
    function total() {
        let sum = 0
        for (let i = 0; i <= list.length; i++) {

            console.log(list[i])
        }
        setTotalPrice(sum)
    }
    const getCartItem = async () => {
        try {
            const ak = await AsyncStorage.getItem('cart')
            if (ak !== null) {
                console.log("local cart: " + ak)
            }
            else
                console.log("đéo có")
        } catch (e) { }
    };

    useEffect(() => {

        // getCartItem()
        total();

    });
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>

            <View style={styles.container}>
                <ScrollView>
                    <View style={{
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}>
                        <View style={{
                            marginTop: 20, flexDirection: 'column', marginLeft: 30, flex: 1,
                            flexDirection: 'column',

                            alignItems: 'flex-start',

                        }}>
                            {
                                list.map((l, i) => (

                                    <ListItem key={i} style={{ width: "100%" }}>

                                        <View style={stylesss.subtitleView}>
                                            <TouchableOpacity
                                            ><View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "black",
                                                padding: 10
                                            }}>
                                                    {/* <Avatar source={{ uri: l.image }} style={stylesss.ratingImage} /> */}
                                                    <View style={{ marginRight: 5, width: "35%" }}>
                                                        <Image source={require("../../image/logo.png")} style={stylesss.ratingImage} />
                                                    </View>

                                                    <View style={{ marginRight: 5, width: "30%" }}>
                                                        <Text>{l.name}</Text>
                                                        <Text>{l.price}</Text>
                                                        <Text>{l.quantity}</Text>
                                                        <Text>{l.tag}</Text>
                                                    </View>
                                                    <View>
                                                        <Ionicons name="trash" size={30} style={{ marginLeft: 50, marginTop: 30 }} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </ListItem>
                                ))
                            }
                        </View>

                        <Text style={{ marginTop: 100 }}>Total: {totalPrice}</Text>
                        <Text style={styles.buttonLogin} onPress={() => log()}>Add to cart</Text>

                    </View>

                </ScrollView>
            </View >

        </KeyboardAvoidingView >
    );
};

export default CartScreen;
const stylesss = StyleSheet.create({
    subtitleView: {
        display: 'flex',
        flexDirection: 'row',
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
        marginTop: 10
    },
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    container2: {
        width: "100%",
        marginTop: 50,
    },

});
