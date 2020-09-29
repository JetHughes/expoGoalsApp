import React from 'react';
import Utils from '../../Utils';
import globalStyles from '../../styles/GlobalStyles';

//ui components
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu,MenuOptions,MenuOption,MenuTrigger,} from 'react-native-popup-menu';

class GoalItem extends React.Component {   

    state = {
        editing: false,
        inputValue: this.props.title,
        inputIsHidden: true
    }

    handleAddPressed = () => {
        console.log(this.state.inputValue);
        this.setState({
            editing: false
        });
        this.props.editItem(this.state.inputValue);
    }

    edit = () => {
        this.setState({editing: true})
    } 

    render(){      
        if(this.state.editing){
            return(
                <View style={styles.item}>
                    <View style={styles.goalItemContainer}>
                        <TextInput 
                            style={styles.text}
                            mode='outlined'                            
                            value={this.state.inputValue} 
                            onChangeText={(value) => this.setState({inputValue: value})}
                            autoFocus={true}
                            onSubmitEditing={this.handleAddPressed}
                        />
                        <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} onPress={this.handleAddPressed}>
                            <Icon name="check" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }  
        return(
            <View style={styles.item}>
                <View style={styles.goalItemContainer}>
                    <Text style={styles.text}>{Utils.toCaps(this.props.title)}</Text>                    
                    <Menu>
                        <MenuTrigger hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
                           <Icon name='dots-vertical' size={24} color="#000"/>
                        </MenuTrigger>
                        <MenuOptions style={styles.menuContainer}>
                            <MenuOption style={globalStyles.menuItem} onSelect={this.props.moveItem}>
                                <Text >Move Up</Text>
                            </MenuOption>   
                            <MenuOption style={globalStyles.menuItem} onSelect={this.props.moveItemDown}>
                                <Text >Move Down</Text>
                            </MenuOption>  
                            <MenuOption style={globalStyles.menuItem} onSelect={this.edit}>
                                <Text >Edit</Text>
                            </MenuOption>
                            <MenuOption style={globalStyles.menuItem} onSelect={this.props.deleteItem}>
                                <Text >Delete</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>    
        );
    }
}

export default GoalItem

const styles = StyleSheet.create({
    item: {
        height: 48,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    goalItemContainer: {
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        fontSize: 16,
        letterSpacing: 0.5,
        alignSelf: 'center'
    }
})

// "#0066FF"