import React from 'react';

//ui components
import {Text,View,StyleSheet,Platform,TouchableOpacity} from 'react-native';
import Utils from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddTrickListItem = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{Utils.toCaps(props.title)}</Text>
            <TouchableOpacity      
                hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}           
                onPress={() => {
                    if (props.status==="selected") {
                        props.removeTrick();
                    } else if (props.status==="unselected") {
                        props.addTrick();
                    }
                }}
            >
                <Icon name={props.icon} size={24} color="#0066FF"/>
            </TouchableOpacity> 
        </View>
    )
}

export default AddTrickListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.OS === "ios" ? 44: 48,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    checkBox: {
        alignSelf: 'center',
    },
    text: {
        flex: 1,
        fontSize: 16,
        letterSpacing: 0.5,
    }
})