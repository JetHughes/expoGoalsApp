import React from "react";
import {StyleSheet,Platform,View,Text,Switch} from 'react-native';

export default function MySwitch(props) {
    if(Platform.OS === "ios"){
        return(        
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{props.title}</Text>
                <Switch   
                    trackColor={{false: "#lightgray", true:"rgba(18,18,18,0.88)"}}
                    onValueChange={props.toggleSwitch}
                    value={props.var}
                />
            </View>
        )
    } else {
        return(        
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{props.title}</Text>
                <Switch   
                    trackColor={{false:"#767577", true: "rgba(18,18,18,0.88)"}}
                    thumbColor="#fff"
                    onValueChange={props.toggleSwitch}
                    value={props.var}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: "row",
        height: Platform.OS === "ios" ? 44 : 48,
        paddingVertical: 12
    },
    switchText: {
        flex: 1,
        alignSelf: "center",
        fontSize: 17
    }
})