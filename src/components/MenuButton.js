import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import menuIcon from "./../../assets/menu_black.png";

export const MenuButton = props => {
  const { navigation } = props;
  return (
    <TouchableOpacity onPress={navigation.toggleDrawer}>
      <Image source={menuIcon} />
    </TouchableOpacity>
  );
};
