import React from 'react';
import HomeApp from './src/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';

import tricks from './src/data/initData/TricksData';
import trickLists from './src/data/initData/TrickListsData';
import goals from './src/data/initData/GoalsData';

class App extends React.Component{
  constructor(props){
    super();
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
