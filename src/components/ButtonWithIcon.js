import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";

const ButtonWithIcon = props => {
  const { buttonImageSource, text, onPressButton, backGroundColor } = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.FacebookStyle,
        backgroundColor: backGroundColor,
        ...props.styles
      }}
      activeOpacity={0.8}
      onPress={onPressButton}
    >
      <Image source={buttonImageSource} style={styles.ImageIconStyle} />
      {text ? <View style={styles.SeparatorLine} /> : null}
      {text ? <Text style={styles.TextStyle}>{text}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3ee",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5,
    margin: 5
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch"
  },
  TextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 5
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40
  }
});

ButtonWithIcon.propTypes = {
  buttonImageSource: PropTypes.any.isRequired,
  onPressButton: PropTypes.func.isRequired,
  backGroundColor: PropTypes.string,
  text: PropTypes.string,
  styles: PropTypes.object
};

ButtonWithIcon.defaultProps = {
  backGroundColor: "#eef3ee",
  styles: {}
};
export default ButtonWithIcon;
