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

const NewGoalModal = ({navigation, route}) => {
    const {addGoal} = route.params;

    const [trick, setTrick] = useState('');

    function add() {
        if(trick.length > 0){
            addGoal(trick);
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
                            placeholder='Trick' 
                            autoCapitalize='sentences' 
                            autoFocus={true} 
                            value={trick} 
                            onChangeText={(value) => setTrick(value)}
                            onSubmitEditing={() => add(trick)}/>
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