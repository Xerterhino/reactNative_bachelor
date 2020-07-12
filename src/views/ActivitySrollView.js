import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList, Button, TextInput } from "react-native";
import { navigateToRoute } from "../utils/routing/routing";
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from "../components/BackHandler";
import { BackButton } from "../components/BackButton";
import { MenuButton } from "../components/MenuButton";
import { routingCtx } from "../utils/routing/routingContext";
import {createActivity, deleteActivity, fetchAllActivies} from "../actions/activities";
import ActivityCard from "../components/ActivityCard";
import PushNotification from "react-native-push-notification";
import BackgroundFetch from "react-native-background-fetch";

export const ActivityScrollView = props => {
    const { actions } = useContext(routingCtx);
    const [value, onChangeText] = React.useState('');
    const [activities, setActivies] = useState([]);
    const [todos, setTodos] = useState([]);
    const [reload, setReload] = useState(false);
    //


    // BackgroundFetch.configure({
    //     minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
    //     // Android options
    //     forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
    //     stopOnTerminate: false,
    //     startOnBoot: true,
    //     requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
    //     requiresCharging: false,      // Default
    //     requiresDeviceIdle: false,    // Default
    //     requiresBatteryNotLow: false, // Default
    //     requiresStorageNotLow: false  // Default
    // }, async (taskId) => {
    //     console.log("[js] Received background-fetch event: ", taskId);
    //     // Required: Signal completion of your task to native code
    //     // If you fail to do this, the OS can terminate your app
    //     // or assign battery-blame for consuming too much background-time
    //     BackgroundFetch.finish(taskId);
    // }, (error) => {
    //     console.log("[js] RNBackgroundFetch failed to start");
    // });

    useEffect(() => {
        handleAndroidBackButton(() => {
            navigateToRoute(props.navigation, "Start");
            actions.setNewRoute("Start");
        });
        return removeAndroidBackButtonHandler();
    }, []);

    useEffect(() => {
        (async () => {
            // setLoading(true);
            try {
                const activities = await fetchAllActivies();
                setActivies(activities);
            } catch (e) {
                console.error("ERROR FETCHING:", e);
            }
            // setLoading(false);
        })();
    }, [reload]);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            (async () => {
                // setLoading(true);
                try {
                    const activities = await fetchAllActivies();
                    setActivies(activities);
                } catch (e) {
                    console.error("ERROR FETCHING:", e);
                }
                // setLoading(false);
            })();
        });

        return unsubscribe;
    }, [props.navigation]);


    const NoElementsFoundPlaceholder = (
        <View style={styles.noElements}>
            <Text>No Activites found.</Text>
        </View>
    );

    const onGoToDetails = activity => {
        // navigateToRoute(props.navigation, "Detail", { activity: activity });
        props.navigation.navigate('Details', { activity: activity })
    };
    const onDelete = async (id) => {
        try {
            const response  = await deleteActivity(id);
        } catch (e) {
            console.error(e)
        }
        setReload(!reload);
    }

    const addActivity = async (name) => {
        try {
            const response = await createActivity(name);
            onGoToDetails(response);
        }   catch (e) {
            console.error(e)
        }
        setReload(!reload);
    }


    return (
        <View style={styles.viewContainer}>
            <Text style={styles.header}>Overview</Text>
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item, index) => `${index}-${item._id}`}
                    data={activities}
                    renderItem={itemData => (
                        <ActivityCard activity={itemData.item} onDelete={onDelete} onToDetails={onGoToDetails} forceReload={() => setReload(!reload)}/>
                    )}
                />
                <View style={styles.flexButtonWrapper}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <Button onPress={() => addActivity(value)} title={"ADD"}/>
                </View>
        </View>
    );
};

ActivityScrollView.navigationOptions = props => ({
    title: "Stables",
    headerLeft: (
        <BackButton
            onPress={() => {
                navigateToRoute(props.navigation, "Start");
            }}
        />
    ),
    headerRight: <MenuButton navigation={props.navigation} />,
    headerTitleStyle: {
        flex: 1,
        color: "#fff",
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "normal"
    }
});

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: "center",
    },
    footerButton: {},
    flatList: {
        flex: 4,
        width: "95%",
        height: "70%"
    },
    noElements: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    flexButtonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "95%",
        paddingBottom: "2%"
    },
    header: {
        fontSize: 25
    }
});
