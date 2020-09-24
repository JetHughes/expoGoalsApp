import React,{useLayoutEffect,useEffect,useState} from 'react';
import tricks from '../../data/initData/TricksData';
import Trick from '../../data/classes/Trick';
import AsyncStorage from '@react-native-community/async-storage';

//ui components
import {View, Text, StyleSheet, Button, ScrollView, Platform} from 'react-native';
import AddTricksListItem from './AddTricksListItem';
import { Divider } from 'react-native-paper';

const AddTricks = ({route, navigation}) => {
  const {trickList} = route.params;
  const {updateTrickList} = route.params;

  const [unselectedTricks, setUnselectedTricks] = useState([]);
  const [selectedTricks, setSelectedTricks] = useState([]);

  useEffect(() => {
    loadTricks();
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('Trick Lists')} title="Done" />
      ),
    });
  }, [navigation]);

  const loadTricks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('trickLibrary_data')
      if (jsonValue !== null) {        
        setUnselectedTricks(JSON.parse(jsonValue).filter(trick => trick.type === trickList.type));
      }
    } catch(e) {
    }
  }

  function addTrick(id) {
    //add to selected tricks
    const newSelectedTricks = [...selectedTricks, unselectedTricks[unselectedTricks.findIndex(trick => trick.id === id)]]
    setSelectedTricks(newSelectedTricks);
    //remove from unselected tricks
    const newUnselectedTricks = unselectedTricks;
    newUnselectedTricks.splice(unselectedTricks.findIndex(trick => trick.id === id), 1);
    setUnselectedTricks(newUnselectedTricks);
    
    updateTrickList(trickList.id, newSelectedTricks);
    console.log("Added trick. Tricks are: " + newSelectedTricks);
  }

  function removeTrick(id){
    //add to unselected tricks
    setUnselectedTricks([selectedTricks[selectedTricks.findIndex(trick => trick.id === id)], ...unselectedTricks]);
    //remove from selected tricks
    const newSelectedTricks = selectedTricks;
    newSelectedTricks.splice(selectedTricks.findIndex(trick => trick.id === id), 1);
    setSelectedTricks(newSelectedTricks);

    updateTrickList(trickList.id, newSelectedTricks);
    console.log("removed trick. Tricks are: " + newSelectedTricks);
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
    height: Platform.OS = "ios" ? 58: 62,
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

const railTricks = [
  new Trick('cab 2 on', 'rails'),
  new Trick('front 3 on', 'rails'),
  new Trick('back 3 out', 'rails'),
  new Trick('board 2', 'rails'),
  new Trick('front blunt 2', 'rails'),
  new Trick('cab 1 on', 'rails'),
  new Trick('front 1 on', 'rails'),
  new Trick('back 1 on', 'rails'),
  new Trick( 'switch back 2 on', 'rails'),
]