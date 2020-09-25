import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Trick from '../../data/classes/Trick';
import {useTheme} from '@react-navigation/native';

//ui components
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Platform,TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import HideableView from '../../components/HideableView';
import TrickListItem from '../../components/TrickListItem';

class TrickLibrary extends React.Component{
  constructor(props) {
    super();
    this.loadAsyncData()
    this.type = props.route.params.type;
  }

  state = {
    tricks: [],
    addingTrick: false,
    trickNameInputValue: ''
  }

  componentDidUpdate() {
    this.storeAsyncData();
  }

  loadAsyncData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("trickLibrary_data")
        if(jsonValue != null){
          this.setState({tricks: JSON.parse(jsonValue)});
          return;
        }
      } catch(e) {
          console.log("Failed to read trickLibrary_data");
      }
  }

  storeAsyncData = async () => {
      try {
          const jsonValue = JSON.stringify(this.state.tricks);
          console.log(jsonValue);
          await AsyncStorage.setItem("trickLibrary_data", jsonValue);
        } catch (e) {
          console.log("Failed to save trickLibrary_data");
        }
  }

  addTrick = (name) => {      
    if(name.length > 0){
      this.setState({addingTrick: false, trickNameInputValue: ''})
      let newTricks = this.state.tricks;
      newTricks.unshift(new Trick(name, this.type));
      this.setState({tricks: newTricks});
    } 
  }

  editTrick = (id, name) => {
    const newTricks = this.state.tricks;
    newTricks[newTricks.findIndex(trick => trick.id === id)].name = name;
    this.setState({tricks: newTricks});
  }

  removeTrick = (id ) => {
    this.setState({
      tricks: [
        ...this.state.tricks.filter(trick => trick.id !== id)
      ]
    })
  }
  
  render() {
    const {theme} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.container}>

        <View style={styles.sectionContainer}>
          <View style={styles.trickItem}>

            <HideableView visible={!this.state.addingTrick}>
              <TouchableOpacity onPress={() => this.setState({addingTrick: true})} style={{flex: 1}} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
                <View>
                  <Text style={{color: theme.colors.primary, fontSize: 17}}>Add Trick</Text>
                </View>
              </TouchableOpacity>
            </HideableView>

            <HideableView visible={this.state.addingTrick}>
                <TextInput
                  autoFocus={true}
                  style={styles.text}
                  placeholder="Trick Name..."
                  value={this.state.trickNameInputValue}
                  onChangeText={value => this.setState({trickNameInputValue: value})}
                  onSubmitEditing={() => this.addTrick(this.state.trickNameInputValue)}
                />
                <Button color={theme.colors.primary} onPress={() => this.addTrick(this.state.trickNameInputValue)}>SAVE</Button>
                <Button color="#ff0033" onPress={() => this.setState({addingTrick: false, trickNameInputValue: ''})}>CANCEL</Button>
            </HideableView>

          </View>
        </View>

        <View style={styles.sectionContainer}>
          {this.state.tricks.filter(trick => trick.type === this.type).map(trick => 
            <TrickListItem 
              key={trick.id}
              trick={trick}
              removeTrick={this.removeTrick}
              editTrick={this.editTrick}
            />    
          )}
        </View>
        </View>
      </ScrollView>
    );
  } 
}

export default function(props) {
  const theme = useTheme();

  return <TrickLibrary {...props} theme={theme} />
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
  },
  sectionContainer: {    
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginBottom: Platform.OS = "ios" ? 44: 48,
  },
  trickItem: {
    flex: 1,
    flexDirection: 'row',
    height: Platform.OS = "ios" ? 44: 48,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  text:{
    flex: 1,
    fontSize: 17
  }
})