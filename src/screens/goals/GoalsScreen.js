import React from 'react';
import Goal from '../../data/classes/Goal';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../styles/GlobalStyles';

//ui components
import {View,ScrollView} from 'react-native';
import GoalsSection from './GoalSection';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class GoalsScreen extends React.Component{
    constructor(props){
        super();
        this.loadAsyncData();   
        this.type = props.route.params.type;

        props.navigation.setOptions({
            headerRight: () => (
              <View style={globalStyles.headerRight}>
                  <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} 
                    //onPress={() => props.navigation.navigate('NewListModal', {addTrickList: this.addTrickList, updateTrickList: this.updateTrickList})}
                    style={globalStyles.headerButton}
                 >
                      <Icon name="plus" size={24} />
                  </TouchableOpacity>
              </View>
            )
          })
    }    

    state = {
        goalsData: []
    }

    componentDidUpdate() {
        this.storeAsyncData();
    }

    loadAsyncData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("goals_data")
          if(jsonValue != null){
            this.setState({goalsData: JSON.parse(jsonValue)});
            return;
          }
        } catch(e) {
            console.log("Failed to read goals_data");
        }
    }

    storeAsyncData = async () => {
        try {
            const jsonValue = JSON.stringify(this.state.goalsData);
            await AsyncStorage.setItem("goals_data", jsonValue);
          } catch (e) {
            console.log("Failed to save goals_data");
          }
    }

    render() {

        const addGoal = (period, name) => {
            const newGoal = new Goal(this.type, period, name);
            const newGoals = [...this.state.goalsData, newGoal];
            console.log("added goal, id was: " + newGoal.id);
            this.setState({goalsData: newGoals});
        }
    
        const editGoal = (id, newName) => {
            let newGoals = this.state.goalsData;
            newGoals[newGoals.findIndex(goal => goal.id === id)].name = newName;
            this.setState({goalsData: newGoals});
        }
    
        const deleteGoal = (id) => {
            this.setState({
                goalsData: [
                    ...this.state.goalsData.filter(goal => goal.id !== id)
                ]
            })
        }
    
        const moveGoal = (period, id) => {
            let newPeriod = period;
            if(period === 'week'){newPeriod = 'day';}
            if(period === 'season') {newPeriod = 'week';}
            let newGoals = this.state.goalsData;
            newGoals[newGoals.findIndex(goal => goal.id === id)].period = newPeriod;
            this.setState({goalsData: newGoals});
        }

        const moveGoalDown = (period, id) => {
            let newPeriod = period;
            if(period === 'day'){newPeriod = 'week';}
            if(period === 'week') {newPeriod = 'season';}
            let newGoals = this.state.goalsData;
            newGoals[newGoals.findIndex(goal => goal.id === id)].period = newPeriod;
            this.setState({goalsData: newGoals});
        }
    
        const type = this.props.route.params.type;

        return(                  
            <ScrollView keyboardShouldPersistTaps="always">
                <View>
                    <GoalsSection
                        goals={this.state.goalsData.filter(goal => goal.type === type).filter(goal => goal.period === 'day')}
                        period='day'
                        deleteGoal={(id) => deleteGoal(id)}
                        editGoal={(id, newName) => editGoal(id,  newName)}
                        moveGoal={(period, id) => moveGoal(period, id)}
                        addGoal={(period, name) => addGoal(period, name)}
                        moveGoalDown={(period, id) => moveGoalDown(period, id)}
                        navigation={this.props.navigation}
                    />                    
                    <GoalsSection
                        goals={this.state.goalsData.filter(list => list.type === type).filter(goal => goal.period === 'week')}
                        period='week'
                        deleteGoal={(id) => deleteGoal(id)}
                        editGoal={(id, newName) => editGoal(id,  newName)}
                        moveGoal={(period, id) => moveGoal(period, id)}
                        addGoal={(period, name) => addGoal(period, name)}
                        moveGoalDown={(period, id) => moveGoalDown(period, id)}
                        navigation={this.props.navigation}                    />                    
                    <GoalsSection
                        goals={this.state.goalsData.filter(list => list.type === type).filter(goal => goal.period === 'season')}
                        period='season'
                        deleteGoal={(id) => deleteGoal(id)}
                        editGoal={(id, newName) => editGoal(id,  newName)}
                        moveGoal={(period, id) => moveGoal(period, id)}
                        addGoal={(period, name) => addGoal(period, name)}
                        moveGoalDown={(period, id) => moveGoalDown(period, id)}
                        navigation={this.props.navigation}
                    />
                </View>        
            </ScrollView>
        );
    }

}

export default GoalsScreen;