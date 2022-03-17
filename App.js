import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";

import RegisterScreen from "./src/components/Register/RegisterScreen";
import LoginScreen from "./src/components/Login/LoginScreen.js";
import NewPass from "./src/components/Login/NewPass.js";
import ForgotPass from "./src/components/Login/ForgotPass.js";
import ActiveScreen from "./src/components/Active/ActiveScreen.js";
import CreateProfile from "./src/components/Profile/CreateProfile.js";
import AddAddress from "./src/components/Profile/AddAddress.js";
import UpdateAddress from "./src/components/Profile/UpdateAddress.js";
import Tab from "./src/components/Tab/Tab.js"
import GetProfile from "./src/components/Profile/GetProfile.js"
import OneProduct from "./src/components/Tab/OneProduct.js"


const Stack = createStackNavigator();

export default function App({ navigation }) {

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Tab"
          component={Tab}

          options={{ headerShown: false, title: "AddAddress", }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}

          options={{ headerShown: false, title: "SINGIN", }}
        />
        <Stack.Screen
          name="NewPass"
          component={NewPass}

          options={{ headerShown: false, title: "NewPass", }}
        />
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}

          options={{ headerShown: false, title: "ForgotPass", }}
        />

        <Stack.Screen
          name="AddAddress"
          component={AddAddress}

          options={{ headerShown: false, title: "AddAddress", }}
        />
        <Stack.Screen
          name="OneProduct"
          component={OneProduct}

          options={{ headerShown: false, title: "OneProduct", }}
        />
        <Stack.Screen
          name="UpdateAddress"
          component={UpdateAddress}

          options={{ headerShown: false, title: "UpdateAddress", }}
        />

        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}

          options={{ headerShown: false, title: "CreateProfile", }}
        />
        <Stack.Screen
          name="Active"
          component={ActiveScreen}

          options={{ headerShown: false, title: "Active", }}
        />
        <Stack.Screen
          name="GetProfile"
          component={GetProfile}

          options={{ headerShown: false, title: "GetProfile", }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            title: "SINGUP",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#2089dc" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

