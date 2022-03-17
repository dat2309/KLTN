import React, { useState } from "react";
import API from "../../../API";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, ScrollView
} from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

import { Button, Input, ListItem, Avatar } from "react-native-elements";

const ProductScreen = ({ navigation }) => {
    let a = [];
    const [cate, setCate] = useState()
    const [product, setProduct] = useState()
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
    }, {
        name: 'Amy ',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman'
    }, {
        name: 'Amy ',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris',
        avatar_url: 'https://drive.google.com/file/d/1vxJ4GF1fDUzQV5PXkcEYVvr01SlGef3k/view?usp=sharing',
        subtitle: 'Vice Chairman'
    }, {
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

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [enteredName, setEnteredName] = useState("");
    const [enteredPass, setEnteredPass] = useState("");
    const getCate = async () => {
        try {
            const url = "/api/category";
            API.get(url).then(res => {
                console.log(res.data.length)
                a = res.data
                console.log(a)
            }).catch(e => {

                getCate();
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    const getProduct = () => {
        try {
            const url = "/api/product";
            API.get(url).then(res => {
                setProduct(res.data.content)


            }).catch(e => {

                getProduct();
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    // getProduct()
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
            <View style={styles.inputic} >
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Ionicons name="search" size={30} />
                </TouchableOpacity>
                <Input
                    onChangeText={(text) => setEnteredName(text)}
                    placeholder="Search"

                    style={styles.inputStyleic}
                />
            </View>
            <Picker style={styles.picker}
                selectedValue={selectedCategory}
                onValueChange={(itemValue) =>
                    setSelectedCategory(itemValue)
                }>
                <Picker.Item label="All" value="all" />
                {/* <Picker.Item label={cate[0].name} value={cate[0].code} />
                <Picker.Item label={cate[1].name} value={cate[1].code} />
                <Picker.Item label={cate[2].name} value={cate[2].code} /> */}


            </Picker>
            <ScrollView >
                <View style={styles.container}>

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
                                        <TouchableOpacity onPress={() => navigation.navigate("OneProduct")}>
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

export default ProductScreen;

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
    inputic: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,
        height: 45
    },
    inputStyleic: {
        flex: 1,
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
    picker: {
        width: 200,
        height: 50,
        marginRight: 150
    }
});

