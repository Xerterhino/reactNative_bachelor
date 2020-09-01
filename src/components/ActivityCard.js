import React from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import ButtonWithIcon from "./ButtonWithIcon";
import alarmIcon from "../../assets/alarm_black.png";
import clearIcon from "../../assets/baseline_clear_black_18dp.png";

const ActivityCard = props => {
    const { onDelete, activity, onToDetails, forceReload } = props;

    const msToTime = (s) => {

        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }

        let ms = s % 1000;
        s = (s - ms) / 1000;
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;
        let hrs = (s - mins) / 60;

        return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
    }

    return (
            <TouchableOpacity  style={styles.itemWrapper} onPress={() => onToDetails(activity)}>
            <Image source={alarmIcon} />
            <View style={styles.text}>
                <Text>{activity.name}</Text>
                <Text>{msToTime(activity.duration)}</Text>
            </View>
            <View style={styles.rightAlignedItems}>
                <View styles={styles.ButtonWrapper}>
                    <ButtonWithIcon
                        onPressButton={() => onDelete(activity._id)}
                        buttonImageSource={clearIcon}
                    />
                </View>
            </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 10,
        // borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    ButtonWrapper: {
        flexDirection: "row",
        backgroundColor: "#e3dfde"
    },
    text: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10
    },
    occupiedLabel: {
        color: "grey",
        flexDirection: "row"
    },
    rightAlignedItems: {
        marginStart: 'auto',
        flexDirection: "row",
        alignItems: "center"
    }
});

export default ActivityCard;
