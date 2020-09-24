import React, {useState} from "react";
import Utils from '../Utils';

//ui componets
import {Text,View,StyleSheet,TouchableOpacity,TextInput,Platform} from "react-native";
import {Button,Divider} from 'react-native-paper';
import HideableView from './HideableView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrickListItem = (props) => {

    const {trick} = props;
    const {removeTrick} = props;
    const {editTrick} = props;

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(Utils.toCaps(trick.name));

    const saveTrick = () => {
        editTrick(trick.id, inputValue);
        setEditing(false);
    }

    return(
        <View key={trick.id}>

        <HideableView visible={!editing}>
           <View style={styles.trick}>                        
               <Text style={styles.listItemText}>{Utils.toCaps(trick.name)}</Text>   
               <TouchableOpacity style={{marginRight: 16}} onPress={() => setEditing(true)}>
                   <Icon name="pencil-outline" size={24}/> 
               </TouchableOpacity>
               <TouchableOpacity onPress={() => removeTrick(trick.id)}>
                   <Icon name="delete-outline" size={24}/> 
               </TouchableOpacity>
           </View>                            
       </HideableView>

       <HideableView visible={editing}>
           <View style={styles.trick}>                                   
               <TextInput
                   autoFocus={true}
                   style={styles.listItemText}
                   placeholder="Trick Name..."
                   value={inputValue}
                   onChangeText={value => setInputValue(value)}
               />
               <Button color="#0066FF" onPress={() => saveTrick()}>SAVE</Button>
               <Button color="#ff0033" onPress={() => setEditing(false)}>CANCEL</Button>
           </View>                            
       </HideableView>

        <Divider style={{marginLeft: 16}} />               
    </View>
    )
}

export default TrickListItem;

const styles = StyleSheet.create({
    trick: {
        height: Platform.OS === "ios" ? 44 : 48,
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: "white",
        flexDirection: 'row'
    },
    listItemText: {
        flex: 1,
        fontSize: 17
    }
})
