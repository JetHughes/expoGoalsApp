import React, { useState } from 'react';
import TrickList from '../../data/classes/TrickList';
import globalStyles from '../../styles/GlobalStyles';

//ui components
import {Text,View,TextInput,TouchableOpacity,Modal,ScrollView} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

const NewListModal = ({navigation, route}) => {
    const {addTrickList} = route.params;
    const {updateTrickList} = route.params;

    const [name, setName] = useState('');
    const [ddlType, setDdlType] = useState('');

    function create() {
        if(name.length > 0 && ddlType.length > 0){
            const newTrickList = new TrickList([], ddlType, name);
            addTrickList(newTrickList);
            navigation.navigate('Add Tricks', {updateTrickList: updateTrickList, trickList: newTrickList});
        }
    }   
    
    return(
        <Modal transparent={true} animationType="slide">
            <View style={globalStyles.modalContainer}>
                <View style={globalStyles.modalScreen} behavior="padding">
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Text style={globalStyles.modalTitle}>New tricklist</Text>
                        <TextInput 
                            style={globalStyles.textInput} 
                            placeholder='Name' 
                            autoCapitalize='sentences' 
                            autoFocus={true} value={name} 
                            onChangeText={(value) => setName(value)}/>
                        <Dropdown                             
                            label="Type"                            
                            useNativeDriver={true}
                            onChangeText={value => setDdlType(value)}
                            value={ddlType}
                            data={[{label:"Rails", value: "rails"}, {label:"Jumps",value: "jumps"}, {label:"Pipe",value: "pipe"}]}/>
                        <View style={globalStyles.actionsContainer}>
                            <TouchableOpacity                 
                                hitSlop={{top: 20, left: 20, bottom: 20, right: 0}}           
                                onPress={() => navigation.navigate('Trick Lists')}><Text style={globalStyles.actionButton}>CANCEL</Text></TouchableOpacity>
                            <TouchableOpacity 
                                hitSlop={{top: 20, left: 0, bottom: 20, right: 20}}           
                                onPress={() => create()}><Text style={globalStyles.actionButton}>CREATE</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default NewListModal;