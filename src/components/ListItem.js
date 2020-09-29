import React, {useState} from "react";
import {View,Text,Platform,StyleSheet,TouchableOpacity} from 'react-native';
import HideableView from './HideableView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SELECTED_ICON = Platform.OS === "ios" ? "circle" : "box";
const UNSELECTED_ICON = Platform.OS === "ios" ? "checked-circle" : "checked-box";

const ListItem = (props) => {
    const {rightComponent} = props;
    const {title} = props;
    const {expandable} = props;
    const {expandLabel} = props.expandLabel ? props : '';
    const {onExpandPressed} = props.onExpandPressed ? props : () => null;

    const [selected,setSelected] = useState();
    const [checkboxVisible, setCheckboxVisible] = useState();

    return(
        <View>

            <HideableView visible={checkboxVisible}>
                <TouchableOpacity onPress={() => setSelected(true)}>
                    <Icon name={selected ? SELECTED_ICON : UNSELECTED_ICON} size={24} />
                </TouchableOpacity>
            </HideableView>

            {/* Title */}
            <View styles={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Right Buttons */}
            <View>

                <HideableView style={{flex: 1}}>
                    <TouchableOpacity onPress={onExpandPressed}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.expandLabel}>{expandLabel}</Text>
                            <Icon name="chevron-right" size={24} color="lightgrey"/>
                        </View>
                    </TouchableOpacity>
                </HideableView>

                <HideableView visible={!expandable}>
                    {rightComponent}
                </HideableView>
            </View>
        </View>
    )
}

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: Platform.OS === "ios" ? 44 : 48
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 17
    },
    expandLabel: {
        color: "lightgray"
    }
})