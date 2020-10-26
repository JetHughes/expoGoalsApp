import React from "react";
import {StyleSheet,Platform,View,Text,Picker} from 'react-native';
import Utils from '../../Utils';
import {ListPicker} from 'react-native-ultimate-modal-picker'; 
import {Dropdown, DropDown} from "react-native-material-dropdown";
import ModalPicker from './ModalPicker';

export default function MyPicker(props) {

    const arrayToItems = (array) => {
        let items = [];
        array.forEach(item => items.push({label: item.toString(), value: item}))
        return items;
    }

    if(Platform.OS === "ios") {
        return(
            <ModalPicker title={props.title} value={props.value} setValue={props.setValue} data={props.data}/>
        )
    } else if(Platform.OS === "android"){
        return(
            <View style={styles.pickerContainer}>
                <Dropdown 
                    label={props.title}
                    onChangeText={value => props.setValue(value)}
                    value={props.value}
                    data={arrayToItems(props.data)}                       
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerContainer: {
        justifyContent: "center",
        flex: 1,
    },
    pickerText: {
        fontSize: 12,
        letterSpacing: 0.4,
        fontWeight: "500",
        color: "gray"
    },
})