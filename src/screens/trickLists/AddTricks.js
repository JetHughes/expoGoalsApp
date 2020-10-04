import React,{useLayoutEffect,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

//ui components
import {View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import AddTricksListItem from './AddTricksListItem';
import { Divider, Button } from 'react-native-paper';

const AddTricks = ({route, navigation}) => {
  const {trickList} = route.params;
  const {updateTrickList} = route.params;
  const {removeTrickList} = route.params;

  const [unselectedTricks, setUnselectedTricks] = useState([]);
  const [selectedTricks, setSelectedTricks] = useState([]);

  useEffect(() => {
    loadTricks();
  }, [])

  const cancel = () => {
    removeTrickList(trickList.id);
    navigation.navigate("Trick Lists");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: "row"}}>
          <Button onPress={() => cancel()} color="red" mode="flat">Cancel</Button>
          <Button onPress={() => navigation.navigate('Trick Lists')} color="#0066FF" mode="flat">Save</Button>
        </View>
      ),
      headerLeft: () => null,      
    });
  }, [navigation]);

  const loadTricks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tricks_data')
      if (jsonValue !== null) {        
        setUnselectedTricks(JSON.parse(jsonValue).filter(trick => trick.type === trickList.type));
      }
    } catch(e) {
    }
  }

  function addTrick(id) {
    //add to selected tricks
    const newSelectedTricks = selectedTricks.concat(unselectedTricks.filter(trick => trick.id === id));
    setSelectedTricks(newSelectedTricks);
    //remove from unselected tricks
    setUnselectedTricks(unselectedTricks.filter(trick => trick.id !== id));
    
    updateTrickList(trickList.id, newSelectedTricks);
  }2

  function removeTrick(id){
    //add to unselected tricks
    const newSelectedTricks = [selectedTricks[selectedTricks.findIndex(trick => trick.id === id)], ...unselectedTricks];
    setUnselectedTricks(newSelectedTricks);
    //remove from selected tricks
    setSelectedTricks(selectedTricks.filter(trick => trick.id !== id));

    updateTrickList(trickList.id, newSelectedTricks);
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>SELECTED TRICKS</Text>
      <View style={styles.tricksContainer}>
        {selectedTricks.map(trick => 
          <View key={trick.id}>
            <AddTricksListItem key={trick.id} title={trick.name} icon='playlist-remove' status='selected' removeTrick={() => removeTrick(trick.id)}/>
            <Divider style={{marginLeft: 16}}/>
          </View>
        )}
      </View>

      <Text style={styles.header}>UNSELECTED TRICKS</Text>
      <View style={styles.tricksContainer}>
        {unselectedTricks.map(trick => 
          <View key={trick.id}>
            <AddTricksListItem key={trick.id} title={trick.name} icon='playlist-plus' status='unselected' addTrick={() => addTrick(trick.id)}/>
            <Divider style={{marginLeft: 16}}/>
          </View>
        )}
      </View>

    </ScrollView>
  );
}

export default AddTricks;

const styles = StyleSheet.create({
  container: {
  },
  header: {
    marginLeft: 16,
    height: Platform.OS === "ios" ? 58: 62,
    paddingTop: 36,
    color: 'gray'
  },
  tricksContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    minHeight: Platform.OS === "ios" ? 44: 48,
    backgroundColor: "white",
  }
})