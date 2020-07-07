import { NavigationActions, StackActions } from "react-navigation";

export const navigateToRoute = (navigation, route, params = {}) => {
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: route, params: params })
      ]
    })
  );
};
