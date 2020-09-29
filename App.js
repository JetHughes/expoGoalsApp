import React from 'react';
import HomeApp from './src/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { enableScreens } from 'react-native-screens';

enableScreens();

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
