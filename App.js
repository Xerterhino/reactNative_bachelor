import React, { useEffect } from "react";
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { RoutingWrapper } from "./src/utils/routing/routingContext";
import {ActivityScrollView} from "./src/views/ActivitySrollView";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DetailView} from "./src/views/DetailView";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import BackgroundFetch from "react-native-background-fetch";


const App = () => {
    useEffect(() => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
            },
            onRegistrationError: function(err) {
                console.error(err.message, err);
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios',
        });

        BackgroundFetch.configure({
            minimumFetchInterval: 15,
            forceAlarmManager: false,
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
            requiresCharging: false,
            requiresDeviceIdle: false,
            requiresBatteryNotLow: false,
            requiresStorageNotLow: false
        },
            async (taskId) => {
            switch (taskId) {
                case 'com.background.push':
                    if (Platform.OS === 'ios'){
                        PushNotificationIOS.presentLocalNotification({
                            alertTitle: "Check your activities!",
                            alertBody: "Log something today!",
                            alertAction: "view"
                        })
                    } else{
                        PushNotification.localNotification({
                            title: "Check your activities!",
                            message: "Log something today!",
                            playSound: true,
                            soundName: "default",
                        })
                    }
                    break;
            }
            BackgroundFetch.finish(taskId);
        },
            (error) => {
            console.log("[js] RNBackgroundFetch failed to start");
        });


        BackgroundFetch.scheduleTask({
            taskId: "com.background.push",
            forceAlarmManager: true,
            delay: 30000,
            periodic: true,
            enableHeadless: true,
            startOnBoot: true,
            stopOnTerminate: false,
        }).catch(e => console.error('Cant schedule Task com.background.push ', e));



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

const Stack = createStackNavigator();

export default App;
