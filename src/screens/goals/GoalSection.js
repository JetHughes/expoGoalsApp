import React from 'react';
import Utils from '../../Utils';

//ui components
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import HideableView from '../../components/HideableView';
import GoalItem from './GoalListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-paper';

class GoalsSection extends React.Component {

    state={
        inputValue: '',
        inputIsVisible: false,
        addGoalIcon: 'plus'
    }

    addGoal = (name) => {
        // this.setState({
        //     // inputValue: '',
        //     //inputIsVisible: false,
        //     icon: 'plus'
        // });
        if(name){
            this.props.addGoal(this.props.period, name);
        }
    }

    showInput = () => {
        if(this.state.inputIsVisible) {this.setState({addGoalIcon: 'plus'})}
        else if(!this.state.inputIsVisible){this.setState({addGoalIcon: 'minus'})}
        this.setState({inputIsVisible: !this.state.inputIsVisible})
    }

    render(){
        return(
            <View style={{width: '100%', marginTop: 16}}>

                {/* header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionHeader}>{Utils.toCaps(this.props.period)}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewGoalModal', {addGoal: this.addGoal})}>
                        <Icon style={styles.sectionIcon} name={this.state.addGoalIcon} size={24}/>
                    </TouchableOpacity> 
                </View>

                <View style={styles.goalsContainer}>         

                    {/* add Item */}
                    <HideableView visible={this.state.inputIsVisible}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="Add trick..." 
                                value={this.state.inputValue} 
                                onChangeText={(value) => {
                                    this.setState({inputValue: value});
                                }}
                                autoFocus={true}
                            />
                            <TouchableOpacity onPress={this.addGoal} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
                                <Icon style={styles.icon} name="check" size={24} />
                            </TouchableOpacity>
                        </View>
                        <Divider style={{marginHorizontal: 8}}/>
                    </HideableView>

                    {/* items */}
                    {this.props.goals.slice(0).reverse().map((goal) => (
                        <View key={goal.id}>    
                            <GoalItem                              
                                title={goal.name}
                                deleteItem={() => this.props.deleteGoal(goal.id)} 
                                editItem={(newName) => this.props.editGoal(goal.id,  newName)}
                                moveItem={() => this.props.moveGoal(this.props.period, goal.id)}
                                moveItemDown={() => this.props.moveGoalDown(this.props.period, goal.id)}
                            />
                            <Divider style={{marginHorizontal: 8}}/>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

export default GoalsSection;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    sectionHeader: {
        flex: 1,
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.15
    },
    sectionIcon: {
        //marginRight: 8
    },
    goalsContainer:{
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
    },
    inputContainer: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        letterSpacing: 0.5,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
    },
})
