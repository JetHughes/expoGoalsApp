import React from 'react'
import trickLists from '../../data/initData/TrickListsData';
import Utils from '../../Utils';
import AsyncStorage from '@react-native-community/async-storage';
import goals from '../../data/initData/GoalsData';
import {useTheme} from '@react-navigation/native';
import { YellowBox } from 'react-native';

//ui components
import {View,Text,StyleSheet,ScrollView,Platform,TouchableOpacity, LogBox} from 'react-native';
import {Button,Divider} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: ...']);

class Home extends React.Component{
  constructor(){
    super();
    this.loadGoalsData();
  }

  state = {
    ddlList: '',
    ddlType: 'rails',
    trick: 'Trick',
    chooseButtonDisabled: true,
    goals: []
  }

  loadGoalsData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("goals_data")
      if(jsonValue != null){
        console.log('got goals data: ' + jsonValue);
        this.setState({goals: JSON.parse(jsonValue)});
        return;
      }
      this.storeAsyncData();
    } catch(e) {
        console.log("Failed to read goals_data");
    }
  }

    storeAsyncData = async () => {
      try {
        const jsonValue = JSON.stringify(goals);
        console.log(jsonValue);
        await AsyncStorage.setItem("goals_data", jsonValue);
      } catch (e) {
        console.log("Failed to save goals_data");
      }
    }

  render() {    

    const {theme} = this.props;

    const data = () => {
      const newData = [];
      trickLists.filter(trickList => trickList.type === this.state.ddlType).forEach(trickList => newData.push({"label": trickList.name, "value": trickList}))
      return newData;
    }

    const getTrick = () => {
      if(this.state.ddlList != ''){
        let newTrick;
        do{
            newTrick = this.state.ddlList.tricks[Math.floor(Math.random() * this.state.ddlList.tricks.length)];
        } while (newTrick == this.state.trick)
        this.setState({trick: newTrick.name});
        console.log("trick is: " + this.state.trick)
      }
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.choosers}>
            <Text style={styles.title}>Trick Chooser</Text>            
            <View style={styles.dropDownContainer}>

              <View style={styles.dropDown}>
                <Dropdown 
                  label="Type of"
                  useNativeDriver={true}
                  onChangeText={(value) => this.setState({ddlType: value})}
                  value={this.state.ddlType}
                  data={[{label:"Rails", value: "rails"}, {label:"Jumps",value: "jumps"}, {label:"Pipe",value: "pipe"}]}/>
              </View>

              <View style={styles.dropDown}>
                <Dropdown 
                  style={styles.dropDown}
                  label="From TrickList"
                  useNativeDriver={true}
                  onChangeText={(value) => {
                    if(this.state.ddlList === ''){
                      this.setState({chooseButtonDisabled: true});
                    }
                    this.setState({chooseButtonDisabled: false});
                    this.setState({ddlList: value})
                  }}
                  value={this.state.ddlList}
                  data={data()} />  
                </View>
            </View>

            <Button                 
              mode="contained" 
              disabled={this.state.chooseButtonDisabled}
              color={theme.colors.primary} 
              onPress={() => getTrick()}
            >
              Choose
            </Button>

            <View style={styles.trickContainer}>
              <Text style={styles.trickText}>{Utils.toCaps(this.state.trick)}</Text>
            </View>

          </View>

          <View>
            <Text style={styles.title}>Todays Goals</Text>
            <View style={styles.goalsContainer}>
              {/* <Button onPress={() => console.log("\nday goals are: " + JSON.stringify(this.state.goals.filter(goal => goal.period === 'day')) )}>HU</Button> */}
              {this.state.goals.filter(goal => goal.period === 'day').map(goal => (
                <View key={goal.id}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate(goal.type)}>
                    <View style={styles.goalListItem}>
                      <Text style={styles.goalText}>{goal.name}</Text>                  
                    </View>
                  </TouchableOpacity>
                  <Divider style={{marginLeft: 16}}/>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } 
}

export default function(props) {
  const theme = useTheme();

  return <Home {...props} theme={theme} />
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  //choosers
  choosers: {
    marginHorizontal: 16,
    marginTop: 48
  },
  dropDownContainer: {
    flexDirection: "row",
  },
  dropDown: {
    flex: 1,
    marginHorizontal: 8,
  },
  button: {
    marginBottom: 8,  
  },
  trickContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 24
  },
  trickText: {
    fontSize: 60,
    letterSpacing: -0.5,
    fontWeight: "300"
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.15,
    marginBottom: 8,
    marginLeft: 16
  },

  //goals
  goalsContainer: {
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray'
  },
  goalListItem: {
    height: Platform.OS === "ios" ? 44: 48,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 17
  }
})