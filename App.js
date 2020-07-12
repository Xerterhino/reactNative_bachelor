import React, { useEffect } from "react";
import 'react-native-gesture-handler';
import { RoutingWrapper } from "./src/utils/routing/routingContext";
import {ActivityScrollView} from "./src/views/ActivitySrollView";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DetailView} from "./src/views/DetailView";
import PushNotification from "react-native-push-notification";
import BackgroundFetch from "react-native-background-fetch";

const Stack = createStackNavigator();

const App = () => {

    useEffect(() => {
        BackgroundFetch.configure({
            minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
            // Android options
            forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
            requiresCharging: false,      // Default
            requiresDeviceIdle: false,    // Default
            requiresBatteryNotLow: false, // Default
            requiresStorageNotLow: false  // Default
        }, async (taskId) => {
            console.log("[js] Received background-fetch event: ", taskId);
            PushNotification.localNotification({
                title: "Check your activities!",
                message: "Log something today!",
                playSound: true,
                soundName: "default",
            })
            // Required: Signal completion of your task to native code
            // If you fail to do this, the OS can terminate your app
            // or assign battery-blame for consuming too much background-time
            BackgroundFetch.finish(taskId);
        }, (error) => {
            console.log("[js] RNBackgroundFetch failed to start");
        });
    }, [])

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
