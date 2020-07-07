import React, { useEffect } from "react";
import 'react-native-gesture-handler';
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { RoutingWrapper } from "./src/utils/routing/routingContext";
import {ActivityScrollView} from "./src/views/ActivitySrollView";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DetailView} from "./src/views/DetailView";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <RoutingWrapper>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ActivityScrollView} />
            <Stack.Screen name="Details" component={DetailView} />
        </Stack.Navigator>
        </RoutingWrapper>
    </NavigationContainer>
  );
};
export default App;
//
// const Stack = createStackNavigator(
//     {
//       Start: {
//         screen: ActivityScrollView,
//         navigationOptions: {
//           title: "Home"
//         }
//       },
//     },
//     {
//       // initialRouteName: "Start",
//       defaultNavigationOptions: {
//         headerStyle: {
//           backgroundColor: "#44DB5E"
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//           fontWeight: "bold"
//         }
//       }
//     }
// );
//
// const AppContainer = createAppContainer(Stack);
