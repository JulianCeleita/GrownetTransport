import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Navigation from "./src/navigation/Navigation";

const App = () => {
  return <Navigation />;
};

export default gestureHandlerRootHOC(App);
