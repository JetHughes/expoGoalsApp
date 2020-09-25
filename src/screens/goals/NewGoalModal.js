import React, { useState } from 'react';
import globalStyles from '../../styles/GlobalStyles';

//components
import {
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Modal} 
from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

    const NewGoalModal = ({navigation, route}) => {
    //const {addGoal} = route.params;

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [period, setPeriod] = useState('');

    function add() {
        if(name.length > 0 && type.length > 0 && period.length > 0){
            //addGoal(trick);
            navigation.navigate("GoalsStack");
        }
    }  

    return(
        <Modal transparent={true}>
        <View style={globalStyles.modalContainer}>
            <KeyboardAvoidingView style={globalStyles.modalScreen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={globalStyles.modalTitle}>New Goal</Text>
                        <TextInput 
                            style={globalStyles.textInput} 
                            placeholder='Name' 
                            autoCapitalize='sentences' 
                            autoFocus={true} 
                            value={name} 
                            onChangeText={(value) => setName(value)}/>
                        <Dropdown 
                            label="Type"
                            onChangeText={(value) => setType(value)}
                            value={type}
                            data={[{label:"Rails", value: "rails"}, {label:"Jumps",value: "jumps"}, {label:"Pipe",value: "pipe"}]}
                        />
                        <Dropdown 
                            label="Period"
                            onChangeText={(value) => setPeriod(value)}
                            value={period}
                            data={[{label:"Day", value: "day"}, {label:"Week",value: "week"}, {label:"Season",value: "season"}]}
                        />
                        <View style={globalStyles.actionsContainer}>
                            <TouchableOpacity                 
                                hitSlop={{top: 20, left: 20, bottom: 20, right: 0}}           
                                onPress={() => navigation.navigate("GoalsStack")}><Text style={globalStyles.actionButton}>CANCEL</Text></TouchableOpacity>
                            <TouchableOpacity 
                                hitSlop={{top: 20, left: 0, bottom: 20, right: 20}}           
                                onPress={() => add(trick)}><Text style={globalStyles.actionButton}>ADD</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
        </Modal>
    )
}

export default NewGoalModal;