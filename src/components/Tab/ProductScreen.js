import React, { useState, useEffect, useRef } from "react";
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

    const [page, setPage] = useState(0)
    const [pagelimit, setPagelimit] = useState()
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cate, setCate] = useState([""]);
    const [product, setProduct] = useState([""]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');
    const scrollRef = useRef();

    function getProduct() {
        try {
            const url = "api/product?pageNumber=" + page + "&pageSize=6&sort=createdDate";
            API.get(url).then(res => {
                setPagelimit(Math.ceil(res.data.totalElements / 6))
                setProducta(res.data.content)
                setFilterData(res.data.content)

            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }
        try {
            const url1 = "api/category";
            API.get(url1).then(res => {
                setCategory(res.data)

            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }
    };
    function getCatego() {

        try {
            const url = "api/category";
            API.get(url).then(res => {
                setCategory(res.data)
            }).catch(e => {

                console.log(e)
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    function handlePageChange(newPage) {
        console.log(newPage)
    }
    function setProducta(a) {
        setProduct(a)
    }
    function setCategory(a) {
        setCate(a)
    }
    const getProducta = () => {
        try {
            const url = "/api/product";
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
    // const cateFilter = (itemValue) => {
    //     if (itemValue !== "ALL") {
    //         const newData = product.filter((item) => {
    //             const itemData = item.categoryCode ? item.categoryCode.toUpperCase() : ''.toUpperCase();
    //             const textData = itemValue.toUpperCase();
    //             return itemData.indexOf(textData) > -1
    //         });

    //         setFilterData(newData);
    //         setSelectedCategory(itemValue);
    //     }
    //     else {
    //         setFilterData(product);
    //         setSelectedCategory(itemValue);
    //     }
    // }
    const cateFilter = (itemValue) => {
        if (itemValue !== "ALL") {
            try {
                const url = "api/product?pageNumber=" + page + "&pageSize=6&sort=createdDate&category=" + itemValue;
                API.get(url).then(res => {
                    setFilterData(res.data.content)
                    setPagelimit(Math.ceil(res.data.totalElements / 6))
                    setProducta(res.data.content)

                }).catch(e => {

                    console.log(e)
                })
            }
            catch (error) {
                console.log(error);
            }
            setSelectedCategory(itemValue);
        }
        else {
            getProduct()
            setSelectedCategory(itemValue);
        }
    }
    const searchFilter = (text) => {

        if (text) {
            try {
                const url = "api/product?pageNumber=" + page + "&pageSize=6&sort=createdDate&name=" + text;
                API.get(url).then(res => {
                    setPagelimit(Math.ceil(res.data.totalElements / 6))
                    setProducta(res.data.content)
                    setFilterData(res.data.content)

                }).catch(e => {

                    console.log(e)
                })
            }
            catch (error) {
                console.log(error);
            }
            setSearch(text);
        }
        else {
            getProduct()
            setSearch(text);
        }
    }
    // const searchFilter = (text) => {
    //     if (text) {
    //         const newData = product.filter((item) => {
    //             const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1
    //         });
    //         setFilterData(newData);
    //         setSearch(text);
    //     }
    //     else {
    //         setFilterData(product);
    //         setSearch(text);
    //     }
    // }
    // useEffect(() => {
    //     getProduct();
    //     // code.push()
    // });
    useEffect(() => {
        let abortController = new AbortController();
        console.log(search)
        if (selectedCategory !== "ALL")
            cateFilter(selectedCategory)
        if (search !== null)
            searchFilter(search)
        else
            getProduct()
        console.log(search)
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        return () => {
            abortController.abort();
        }
    }, [page]);
    function handlePage(pagee) {
        setPage(pagee)
        console.log(pagee)
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.inputic} >
                <Ionicons name="search" size={30} />
                <Input
                    onChangeText={(text) => searchFilter(text)}
                    placeholder="Search"
                    value={search}
                    style={styles.inputStyleic}
                />
            </View>
            <Picker style={styles.picker}
                mode="dropdown"
                selectedValue={selectedCategory}
                onValueChange={(itemValue) =>
                    cateFilter(itemValue)
                }>
                <Picker.Item label="ALL" value="ALL" />
                {
                    cate.map((l, i) => (

                        <Picker.Item label={l.name} key={i} value={l.code} />
                    ))
                }



            </Picker>
            <ScrollView ref={scrollRef}>
                <View style={styles.container}>

                    <View style={{
                        marginTop: 20, flexDirection: 'row', marginLeft: 30, flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',

                    }}>
                        {
                            filterData.map((l, i) => (

                                <ListItem key={i} style={{ width: "50%" }}>

                                    <View style={stylesss.subtitleView}>
                                        <TouchableOpacity onPress={() => navigation.navigate("OneProduct", { idPro: l.id })}>
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
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }} >
                        <TouchableOpacity style={styles.button} disabled={page <= 0} onPress={() => handlePage(page - 1)}><Text>Prev</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} disabled={page === pagelimit - 1} onPress={() => handlePage(page + 1)}><Text>Next</Text></TouchableOpacity>
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
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        marginLeft: 10
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

        paddingBottom: 10,
        height: 45,
        marginLeft: 15
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
        marginRight: 150,
        marginLeft: 15
    }
});

