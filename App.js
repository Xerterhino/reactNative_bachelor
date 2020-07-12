import React, { useEffect } from "react";
import 'react-native-gesture-handler';
import { RoutingWrapper } from "./src/utils/routing/routingContext";
import {ActivityScrollView} from "./src/views/ActivitySrollView";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DetailView} from "./src/views/DetailView";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import BackgroundFetch from "react-native-background-fetch";

const Stack = createStackNavigator();

const App = () => {

    useEffect(() => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: Platform.OS === 'ios',
        });

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


            // Use a switch statement to route task-handling.
            switch (taskId) {
                case 'com.background.push':
                    PushNotification.localNotification({
                        title: "Check your activities!",
                        message: "Log something today!",
                        playSound: true,
                        soundName: "default",
                    })
                    console.log("IOS NOTIFICATION")

                    PushNotificationIOS.presentLocalNotification({
                        alertTitle: "Check your activities!",
                        alertBody: "Log something today!",
                        alertAction: "view"
                    })
                    ;
                    break;
                default:
                    PushNotification.localNotification({
                        title: "Check your activities!",
                        message: "Log something today!",
                        playSound: true,
                        soundName: "default",
                    })
                    console.log("IOS NOTIFICATION")

                    PushNotificationIOS.presentLocalNotification({
                        alertTitle: "Check your activities!",
                        alertBody: "Log something today!",
                        alertAction: "view"
                    })

            }
            // Required: Signal completion of your task to native code
            // If you fail to do this, the OS can terminate your app
            // or assign battery-blame for consuming too much background-time
            BackgroundFetch.finish(taskId);
        }, (error) => {
            console.log("[js] RNBackgroundFetch failed to start");
        });

// Step 2:  Schedule a custom "oneshot" task "com.foo.customtask" to execute 5000ms from now.
        BackgroundFetch.scheduleTask({
            taskId: "com.background.push",
            forceAlarmManager: true,
            delay: 500  // <-- milliseconds
        }).catch(e => console.error(e));
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
