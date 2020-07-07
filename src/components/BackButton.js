import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import arrowBackIcon from "../../assets/arrow_back.png";

export const BackButton = props => {
  return (
    <TouchableOpacity style={{ marginLeft: 7 }} onPress={props.onPress}>
      <Image source={arrowBackIcon} />
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
