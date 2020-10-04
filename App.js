import React from 'react';
import HomeApp from './src/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from "@react-native-community/async-storage";

//init data
import tricks from "./src/data/initData/TricksData";
import trickLists from "./src/data/initData/TrickListsData";
import goals from "./src/data/initData/GoalsData";

enableScreens();

class App extends React.Component{
  constructor(props){
    super();

    this.getData();
  }

  storeArray = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log("saved: " + key);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log("Failed to save " + key);
    }
  }

  storeItem = async (value) => {
    try {
      await AsyncStorage.setItem("is-first-open", value);

    } catch (e) {
      console.log("failed to save first open");
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("is-first-open");

      if(value) {
        console.log("data already stored");
      } else {
        console.log("storing init data");
        this.storeArray(tricks, "tricks_data");
        this.storeArray(trickLists, "trickLists_data");
        this.storeArray(goals, "goals_data");
        this.storeItem("false")
    }
    } catch(e) {
      console.log("failed to get data")
    }
  }  

  render() {
    return (
      <MenuProvider>
        <HomeApp/>
      </MenuProvider>
    );
  }
}

export default App;
