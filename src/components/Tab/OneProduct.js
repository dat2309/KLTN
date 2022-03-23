import React, { useState, useEffect, useRef } from "react";
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
const OneProduct = ({ route, navigation }) => {
    const [sameData, setSameData] = useState([]);
    const [sizeS, setSizeS] = useState();
    const [sizeM, setSizeM] = useState();
    const [sizeL, setSizeL] = useState();
    const [outStock, setOutStock] = useState()
    const [cart, setCart] = useState([])
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
    const [onePro, setOnePro] = useState("")
    function getOneProduct() {
        try {
            const url = "api/product/" + route.params.idPro;
            API.get(url).then(res => {


                setOnePro(res.data)
                console.log(onePro.sizes.length)
                if (onePro.sizes.length === 0) {
                    setOutStock("Out of stock")
                    setAbackgroundcolor(["gray", "gray", "gray"])
                    setSizeL(0)
                    setSizeM(0)
                    setSizeS(0)
                    setCloru(["gray", "gray", "gray"])

                }
                else {
                    for (let i = 0; i < onePro.sizes.length; i++) {
                        if (onePro.sizes[i].tag === "S")
                            if (onePro.sizes[i].quantity === 0) {
                                setSizeS(0)
                                coloru[0] = "gray"
                                abackgroundcolor[0] = "gray"

                            }
                        if (onePro.sizes[i].tag === "M")
                            if (onePro.sizes[i].quantity === 0) {
                                setSizeM(0)
                                coloru[1] = "gray"
                                abackgroundcolor[1] = "gray"
                            }
                        if (onePro.sizes[i].tag === "L")
                            if (onePro.sizes[i].quantity === 0) {
                                setSizeL(0)
                                coloru[2] = "gray"
                                abackgroundcolor[2] = "gray"

                            }
                    }
                }


            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }

    };
    function getProductByCate(catecode) {
        try {
            const url = "api/product?pageNumber=" + 0 + "&pageSize=6&sort=createdDate&category=" + catecode;
            API.get(url).then(res => {
                setSameData(res.data.content)
            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    const [coloru, setCloru] = useState(["white", "white", "white"])
    const [size, setSize] = useState("")
    const [tokenn, setTokenn] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [abackgroundcolor, setAbackgroundcolor] = useState(["white", "white", "white"])
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
        coloru[0] = "blue"
        abackgroundcolor[0] = "blue"
        if (sizeM === 0 && sizeL !== 0) {
            coloru[2] = "white"
            abackgroundcolor[2] = "white"
        }
        if (sizeL === 0 && sizeM !== 0) {
            coloru[1] = "white"
            abackgroundcolor[1] = "white"
        } if (sizeL !== 0 && sizeM !== 0) {
            coloru[1] = "white"
            abackgroundcolor[1] = "white"
            coloru[2] = "white"
            abackgroundcolor[2] = "white"
        }
        setSize("S")
    }
    function changeColor1() {
        coloru[1] = "blue"
        abackgroundcolor[1] = "blue"
        if (sizeS === 0 && sizeL !== 0) {
            coloru[2] = "white"
            abackgroundcolor[2] = "white"
        }
        if (sizeL === 0 && sizeS !== 0) {
            coloru[0] = "white"
            abackgroundcolor[0] = "white"
        }
        if (sizeL !== 0 && sizeS !== 0) {
            coloru[2] = "white"
            abackgroundcolor[2] = "white"
            coloru[0] = "white"
            abackgroundcolor[0] = "white"
        }
        setSize("M")
    }
    function changeColor2() {
        coloru[2] = "blue"
        abackgroundcolor[2] = "blue"
        if (sizeS === 0 && sizeM !== 0) {
            coloru[1] = "white"
            abackgroundcolor[1] = "white"
        }
        if (sizeM === 0 && sizeS !== 0) {
            coloru[0] = "white"
            abackgroundcolor[0] = "white"
        } if (sizeM !== 0 && sizeS !== 0) {
            coloru[0] = "white"
            abackgroundcolor[0] = "white"
            coloru[1] = "white"
            abackgroundcolor[1] = "white"
        }
        setSize("L")
    }

    const addToCart = async () => {
        // const ak = await AsyncStorage.getItem('cart')
        // if (ak !== null) {
        //     setCart(ak);
        //     console.log("local" + ak)
        // }
        // else
        //     setCart(null)

        // await AsyncStorage.setItem('cart', JSON.stringify(cart));
        // navigation.navigate("CartScreen")
    };
    function log() {
        if (size !== "M" && size !== "L" && size !== "S")
            Alert.alert("Please choose your size!");
        else {
            let sum = 0;
            for (let i = 0; i < onePro.sizes.length; i++) {
                if (onePro.sizes[i].tag === size)
                    if (onePro.sizes[i].quantity < quantity)
                        Alert.alert(" limited quantity");
                    else {
                        console.log("add");
                        let item = {
                            'proId': route.params.idPro,
                            'tag': size,
                            'quantity': quantity,
                            'image': onePro.image,
                            'price': onePro.price
                        }
                        // console.log(item)
                        // if (cart === null)
                        //     setCart(item)
                        // else
                        // setCart((cart) => [...cart,item])
                        //     setCart([...cart, item])
                        // console.log("cart:" + cart.length);
                        // console.log("cart:" + cart);
                        // for (let i = 0; i < cart.length; i++) {
                        //     console.log(cart[i].tag + "/" + i)
                        // }
                    }
            }
        }

    }

    function remo() {
        if (quantity > 1)
            setQuantity(quantity - 1)

    }
    function add() {
        setQuantity(quantity + 1)
    }
    useEffect(() => {

        let abortController = new AbortController();
        getToken();
        getOneProduct();
        // setDisableSize();
        // getProductByCate(onePro.categoryCode);
        return () => {
            abortController.abort();
        }

    });
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Ionicons name="arrow-back-outline" size={30} style={{ textAlign: "left", marginTop: 60, marginLeft: 15 }} onPress={() => navigation.navigate("ProductScreen")} />
                <ScrollView>

                    <View style={{ alignItems: "center", }}>

                        <Avatar source={{ uri: onePro.image }} style={stylesss.ratingImage} />
                        <View style={styles.container2}>
                            <Text style={styles.text}>{onePro.name}</Text>
                            <Text style={styles.text}>{onePro.description}</Text>
                            <Text style={styles.text}>Price: {onePro.price}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                                <TouchableOpacity
                                    disabled={sizeS <= 0}
                                    style={{
                                        backgroundColor: abackgroundcolor[0], width: 35,
                                        height: 35,
                                        marginLeft: 15,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        alignItems: "center",
                                        borderRadius: 10,
                                    }} onPress={() => changeColor0()}>
                                    <Text

                                        style={{
                                            backgroundColor: coloru[0], textAlign: "center", fontSize: 20,

                                        }} >S</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => changeColor1()} disabled={sizeM <= 0} style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: abackgroundcolor[1],
                                    marginLeft: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    alignItems: "center",
                                    borderRadius: 10,
                                }}>
                                    <Text
                                        style={{
                                            backgroundColor: coloru[1], textAlign: "center", fontSize: 20,

                                        }} >M</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => changeColor2()} disabled={sizeL <= 0} style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: abackgroundcolor[2],
                                    marginLeft: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    alignItems: "center",
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        backgroundColor: coloru[2], textAlign: "center", fontSize: 20,

                                    }}>L</Text></TouchableOpacity>
                                <Text style={{ fontSize: 25, color: "red", marginLeft: 20, textDecorationLine: 'underline', fontWeight: 'bold' }}>{outStock}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                                <Text style={{ fontSize: 20, marginRight: 20, marginLeft: 15 }}>Quantity: </Text>
                                <Ionicons name="remove-circle-outline" size={30} onPress={() => remo()}></Ionicons>
                                <Text style={styles.quantity}>{quantity}</Text>
                                <Ionicons name="add-circle-outline" size={30} onPress={() => add()}></Ionicons>

                            </View>


                            <Text style={styles.buttonLogin} onPress={() => log()}>Add to cart</Text>

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
        marginLeft: 15,
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
