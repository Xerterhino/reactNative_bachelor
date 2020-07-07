import React, { useState } from "react";

export const routingCtx = React.createContext("");

export const RoutingWrapper = ({ children }) => {
  const { Provider } = routingCtx;
  const [activeRoute, setActiveRoute] = useState("");

  const setNewRoute = route => {
    setActiveRoute(route);
  };

  const getActiveRoute = () => {
    return activeRoute;
  };
  return (
    <Provider
      value={{
        activeRoute,
        actions: {
          setNewRoute,
          getActiveRoute
        }
      }}
    >
      {children}
    </Provider>
  );
};
