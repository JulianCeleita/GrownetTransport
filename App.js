import React, { useEffect } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Navigation from "./src/navigation/Navigation";
import * as Updates from 'expo-updates';

const App = () => {

  const getVersionStore = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      console.log('update', JSON.stringify(update, null, 2));
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(() => {
    getVersionStore();
  }, [])

  return <Navigation />;
};

export default gestureHandlerRootHOC(App);
