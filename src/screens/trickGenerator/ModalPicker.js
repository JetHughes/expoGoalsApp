import React, {useState} from 'react';
import {StyleSheet,View,Text, Platform, Picker} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Button} from "react-native-paper";
import Modal from "react-native-modal";
import Utils from "../../Utils";

export default function ModalPicker(props) {

    const [item, setItem] = useState(props.value ? props.value : "Select")
    const [temp, setTemp] = useState(props.value ? props.value : "Select")
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const openModal = () => {
        props.setValue(props.data[0]);
        toggleModal();
    }

    const pressDone = () => {
        setItem(temp);
        props.setValue(temp);
        toggleModal();
    }

    return(
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={openModal}>
                <View style={styles.container}>        
                    <View style={{flex: 1}}>                    
                        <Text style={styles.header}>{props.title}</Text>
                        <Text style={styles.text}>{Utils.toCaps(item)}</Text>
                    </View>
                    <Icon name="chevron-down" size={24} color="lightgray"/>
                </View>
            </TouchableOpacity>

            <Modal isVisible={modalVisible} backdropOpacity={.30} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.topButtons}>
                        <Button color="#0066ff" onPress={toggleModal}>Close</Button>
                        <Button color="#0066ff" onPress={pressDone}>Done</Button>
                    </View> 
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={temp} onValueChange={value => setTemp(value)}>
                            {props.data.map(item => (
                                <Picker.Item key={Utils.unique()} label={Utils.toCaps(item.toString())} value={item}/>
                            ))}
                        </Picker>
                    </View>                    
                </View>
            </Modal>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eeeeee",
        height: 48,
        paddingLeft: 16,
        paddingRight: 12,
        paddingTop: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#999",
        marginBottom: 8,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    },
    header: {
        fontSize: 12,
        fontWeight: "500",
        color: "gray"
    },
    text: {
        fontSize: 17,        
    },
    modal: {
        margin: 0,
    },
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    topButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        width: "100%",
        backgroundColor:'#FFFFFF',
        borderColor: '#7D7D7D',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    pickerContainer: {
        height: 250,
        width: "100%",
        backgroundColor:'#FFFFFF',
    }
})

// import React, {useState} from 'react';
// import {Button, Text, View} from 'react-native';
// import Modal from 'react-native-modal';

// export default function ModalTester() {
//     const [isModalVisible, setModalVisible] = useState(false);

//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };

//     return(
//         <View style={{flex: 1}}>
//             <Button title="Show modal" onPress={toggleModal} />

//             <Modal isVisible={isModalVisible} backdropOpacity={1}>
//             <View style={{flex: 1}}>
//                 <Text>Hello!</Text>

//                 <Button title="Hide modal" onPress={toggleModal} />
//             </View>
//             </Modal>
//         </View>
//     )
// }