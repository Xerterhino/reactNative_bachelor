import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList, Button, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { navigateToRoute } from "../utils/routing/routing";
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from "../components/BackHandler";
import { BackButton } from "../components/BackButton";
import { MenuButton } from "../components/MenuButton";
import { routingCtx } from "../utils/routing/routingContext";
import {updateActivity} from "../actions/activities";
import moment from 'moment'

function Timer({ interval, style }) {
    const pad = (n) => n < 10 ? '0' + n : n
    const duration = moment.duration(interval)
    const centiseconds = Math.floor(duration.milliseconds() / 10)
    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())},</Text>
            <Text style={style}>{pad(centiseconds)}</Text>
        </View>
    )
}

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[ styles.button, { backgroundColor: background }]}
            activeOpacity={disabled ? 1.0 : 0.7}
        >
            <View>
                <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


function ButtonsRow({ children }) {
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
}
export const DetailView = props => {
    const { actions, navigation } = useContext(routingCtx);
    const {activity} = props.route.params;
    const [value, onChangeText] = React.useState(activity.name);
    const [start, setStart] = useState(0);
    const [paused, setPaused] = useState(0);
    const [now, setNow] = useState(activity.duration);
    const [timer, setTimer] = useState(0);

    // const timer = now - start;
    const startTimer = () => {
        if(paused === 0) {
            const now = new Date().getTime() - parseInt(activity.duration)
            setStart(now)
            setTimer(setInterval(() => {
                setNow(new Date().getTime() - now);
            }, 100))
        } else {
            const time = new Date().getTime() - paused;
            setStart(time)
            setTimer(setInterval(() => {
                setNow(new Date().getTime() - time);
            }, 100))
        }
    }
    useEffect(() => {
        return clearInterval(timer);
    }, [])

    const stop = () => {
        clearInterval(timer)
        setPaused(new Date().getTime() - start);
    }
    const reset = () => {
        setStart(0);
        setPaused(1);
        setNow(0);
    }
    const resume = () => {
        const now = new Date().getTime()
        setStart(now);
        setNow(now);
        setInterval(() => {
            setTimer(new Date().getTime());
        }, 100)
    }

    useEffect(() => {
        handleAndroidBackButton(() => {
            props.navigation.navigate("Home");
            // navigateToRoute(props.navigation, "Start");
            actions.setNewRoute("Home");
        });
        return removeAndroidBackButtonHandler();
    }, []);


    const saveAct = async () => {
        try {
            const response = await updateActivity(activity._id, value, now)
            props.navigation.navigate("Home");
        }catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.header}>Chronometer</Text>

            <View style={styles.container}>
                <Timer
                    interval={now}
                    style={styles.timer}
                />
                    <ButtonsRow>
                        <RoundButton
                            title='Stop'
                            color='#000000'
                            background='#FF0500'
                            onPress={() => stop()}
                        />
                        <RoundButton
                            title='Reset'
                            color='#FFFFFF'
                            background='#002EFF'
                            onPress={() => reset()}
                        />
                        <RoundButton
                            title='Start'
                            color='#50D167'
                            background='#1B361F'
                            onPress={() => startTimer()}
                        />
                    </ButtonsRow>


            </View>
                <View style={styles.flexButtonWrapper}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', color: 'black' }}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <Button onPress={() => saveAct()} title={"SAVE"}/>
                </View>
        </View>
    );
};

DetailView.navigationOptions = props => ({
    title: 'Details',
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
        height: "95%"
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 130,
        paddingHorizontal: 20,
    },
    timer: {
        fontSize: 76,
        fontWeight: '200',
        width: 110,
    },
    button: {
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 18,
    },
    buttonBorder: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 80,
        marginBottom: 30,
    },
    lapText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    lapTimer: {
        width: 30,
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    scrollView: {
        alignSelf: 'stretch',
    },
    fastest: {
        color: '#4BC05F',
    },
    slowest: {
        color: '#CC3531',
    },
    timerContainer: {
        flexDirection: 'row',


        fontSize: Platform.OS === 'ios' ? 25 : 20,
        color: Platform.OS === 'android' ? 'red' : 'green'



    }
});
