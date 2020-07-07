import React from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import ButtonWithIcon from "./ButtonWithIcon";
import alarmIcon from "../../assets/alarm_black.png";
import clearIcon from "../../assets/baseline_clear_black_18dp.png";

const ActivityCard = props => {
    const { onDelete, activity, onToDetails, forceReload } = props;


    return (
            <TouchableOpacity  style={styles.itemWrapper} onPress={() => onToDetails(activity)}>
            <Image source={alarmIcon} />
            <View style={styles.text}>
                <Text>{activity.name}</Text>
                <Text>{activity.duration}</Text>
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
        borderWidth: 1,
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
