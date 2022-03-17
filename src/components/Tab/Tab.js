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
    TouchableOpacity, Pressable
} from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen.js";
import CartScreen from "./CartScreen.js";
import ProductScreen from "./ProductScreen.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
const Tabs = ({ navigation }) => {
    const [tokenn, setTokenn] = useState("")
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
    };
    getToken();
    console.log(tokenn)
    const getPro = () => {
        getToken()
        try {
            const url = "/api/user/" + id + "/profile";
            API.get(url, { 'headers': { 'Authorization': tokenn } }).then(res => {
                console.log(res.data)
                if (typeof (res.data.firstName) === 'undefined')
                    navigation.navigate("CreateProfile")
                else
                    navigation.navigate("GetProfile", { name: res.data.firstName + " " + res.data.lastName, phone: res.data.phone, gender: res.data.gender, list: res.data.addresses })




            }).catch(e => {
                if (e.response.status === 401)
                    console.log("hh401")
            })
        }
        catch (error) {
            console.log(error);
        }


    };
    const change = async () => {
        if (tokenn === null) {
            navigation.navigate("Login")
        } else {
            getPro()
        }
        setTokenn(null)
    };
    const getProfile = async () => {
        getToken()
        console.log(tokenn)
        change()
    };
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            removeValue()
        }

        console.log('Done.')
    };
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                tabBarActiveTintColor: "#2089dc",
                tabBarInactiveTintColor: "#cccccc",
                tabBarIndicatorStyle: {
                    backgroundColor: "#fff",
                    height: 5,
                },
                tabBarShowIcon: true,
            }}
        >
            <Tab.Screen
                name="HomeScreen"

                component={HomeScreen}
                options={{
                    title: "DEVT",
                    headerTitleStyle: {
                        color: "#2089dc",
                        fontWeight: "bold",
                        fontSize: 40,
                        marginLeft: 20,
                    },
                    tabBarLabel: "Home",
                    headerLeft: () => (

                        <Fontisto
                            name="power"
                            style={{ marginRight: 15 }}
                            size={25}
                            color="#2089dc"
                            onPress={removeValue}
                        />

                    ),
                    headerRight: () => (

                        <Ionicons
                            name="md-menu-sharp"
                            style={{ marginLeft: 5 }}
                            size={30}
                            color="#2089dc"
                            onPress={getProfile}
                        />


                    ),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    title: "DEVT",
                    headerTitleStyle: {
                        color: "#2089dc",
                        fontWeight: "bold",
                        fontSize: 40,
                        marginLeft: 20,
                    },
                    tabBarLabel: "Product",
                    headerRight: () => (

                        <Ionicons
                            name="md-menu-sharp"
                            style={{ marginLeft: 5 }}
                            size={30}
                            color="#2089dc"
                            onPress={getProfile}
                        />

                    ),
                    headerLeft: () => (
                        <Pressable onPress={console.log("A")}>

                        </Pressable>
                    ),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="shirt" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="CartScreen"
                component={CartScreen}

                options={{
                    title: "DEVT",
                    headerTitleStyle: {
                        color: "#2089dc",
                        fontWeight: "bold",
                        fontSize: 40,
                        marginLeft: 20,
                    },
                    tabBarLabel: "Cart",
                    headerRight: () => (

                        <Ionicons
                            name="md-menu-sharp"
                            style={{ marginLeft: 5 }}
                            size={30}
                            color="#2089dc"
                            onPress={getProfile}
                        />

                    ),

                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart" color={color} size={30} />
                    ),
                }}
            />



        </Tab.Navigator>
    );
};
export default Tabs;