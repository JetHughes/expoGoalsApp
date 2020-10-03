import React from 'react';
import trickLists from '../../data/initData/TrickListsData';
import globalStyles from '../../styles/GlobalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import Utils from '../../Utils';

//ui components
import {View,Text,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-paper';

class TrickLists extends React.Component{
  constructor(props) {
    super();

    this.loadAsyncData();

    props.navigation.setOptions({
      headerRight: () => (
        <View style={globalStyles.headerRight}>
            <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} 
              onPress={() => props.navigation.navigate('NewListModal', {addTrickList: this.addTrickList, updateTrickList: this.updateTrickList, removeTrickList: this.removeTrickList})}
              style={globalStyles.headerButton}
           >
                <Icon name="plus" size={24} />
            </TouchableOpacity>
        </View>
      )
    })
  }

  state = {
    trickLists: trickLists
  }

  componentDidUpdate() {
    this.storeAsyncData();
  }

  loadAsyncData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("trickLists_data")
        if(jsonValue != null){
          this.setState({trickLists: JSON.parse(jsonValue)});
          return;
        }
      } catch(e) {
          console.log("Failed to read trickLists_data");
      }
  }

  storeAsyncData = async () => {
      try {
          const jsonValue = JSON.stringify(this.state.trickLists);
          await AsyncStorage.setItem("trickLists_data", jsonValue);
        } catch (e) {
          console.log("Failed to save trickLists_data");
        }
  }

  addTrickList = (newTricklist) => {
    // const newTrickLists = this.state.trickLists;
    // newTrickLists.unshift(newTricklist); 
    // this.setState({trickLists: newTrickLists});

    this.setState({trickLists: this.state.trickLists.concat(newTricklist)})
  }

  updateTrickList = (id, newTricks) => {
    //udate tricks to newtricks
    const newTrickList = this.state.trickLists[this.state.trickLists.findIndex(tricklist => tricklist.id === id)];
    newTrickList.tricks = newTricks;

    //update trickLists
    const newTrickLists = this.state.trickLists;  
    newTrickLists[this.state.trickLists.findIndex(tricklist => tricklist.id === id)] = newTrickList;

    this.setState({trickLists: newTrickLists});
  }    

  removeTrickList = (id) => {
    this.setState({
      trickLists: [
        ...this.state.trickLists.filter(trickList => trickList.id !== id)
      ]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.trickListsContainer}>
          {this.state.trickLists.map((trickList) => (
          <View style={styles.trickListItem} key={trickList.id}>           
                 
              <TouchableOpacity onPress={() => this.removeTrickList(trickList.id)}>
                <Icon 
                  name="delete-outline" 
                  size={24} 
                  style={{marginRight: 16}}
                />
              </TouchableOpacity>

              <View style={{flex: 1}}>
                <TouchableOpacity 
                  key={trickList.id} 
                  onPress={() => 
                    this.props.navigation.navigate('View List', {trickList: trickList, updateTrickList: this.updateTrickList})
                  }
                >
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>{Utils.toCaps(trickList.name)}</Text>
                    <Text style={{color:"lightgrey"}}>{trickList.tricks.length + ' '}</Text>
                    <Text style={{color:"lightgrey"}}>{trickList.type}</Text>
                    <Icon name="chevron-right" size={24} color="lightgrey"/>
                  </View>
                </TouchableOpacity>
              </View>

              <Divider style={{marginLeft: 16}} />
            </View>
          ))}
          </View>
      </View>
    );
  } 
}

export default TrickLists;

const styles = StyleSheet.create({
  container: {    
  },
  text: {
    flex: 1,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  trickListsContainer: {    
    // shadowColor: '#333',
    // shadowOpacity: 0.3,
    // shadowOffset: {width: 1, height: 1},
    //elevation: 1,
    backgroundColor: "#0000",
    marginTop: Platform.OS === "ios" ? 44: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray"
  },
  trickListItem: {
    width: '100%',
    flexDirection: 'row',
    height: Platform.OS === "ios" ? 44: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 8,
    backgroundColor: "white",
  },
})