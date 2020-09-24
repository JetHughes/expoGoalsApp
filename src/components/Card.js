import React from 'react';

//components
import {StyleSheet,View} from 'react-native'

class Card extends React.Component {

    render(){
            return(
                <View style={[cardStyles.card, {...this.props.style}]}>
                    {this.props.children}
                </View>
            );    
    }
}

export default Card;

const cardStyles = StyleSheet.create({
    card: {       
        borderRadius: 6,
        backgroundColor: '#FFF',
        marginBottom: 8,
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12
    }
}) 