import React from 'react'
import Utils from '../../Utils';
import AsyncStorage from '@react-native-community/async-storage';
import goals from '../../data/initData/GoalsData';
import {useTheme} from '@react-navigation/native';
import { ToastAndroid, YellowBox } from 'react-native';

//ui components
import {View,Text,StyleSheet,ScrollView,Platform,TouchableOpacity, LogBox} from 'react-native';
import {Button,Divider} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: ...']);

class Home extends React.Component{
  constructor(){
    super();
    this.loadAsyncData();
  }

  state = {
    ddlList: '',
    ddlType: 'rails',
    trick: 'Trick',
    goals: [],
    tricklists: []
  }

  storeOptionData = async () => {
    try {      
      const jsonValue = JSON.stringify(this.state.ddlList);
      await AsyncStorage.setItem("ddlList_data", jsonValue);
      await AsyncStorage.setItem("ddlType_data", this.state.ddlType);
    } catch (e) {
      console.log("Failed to save option_data");
    }
  }

  storeGoalsData = async () => {
    try {
      const jsonValue = JSON.stringify(goals);
      await AsyncStorage.setItem("goals_data", jsonValue);
    } catch (e) {
      console.log("Failed to save goals_data");
    }
  }

  loadAsyncData = async () => {

    //trickLists data
    try {
      const jsonValue = await AsyncStorage.getItem("trickLists_data")
      if(jsonValue != null){
        this.state.trickLists = JSON.parse(jsonValue);
        console.log("\n\nloaded trickList data: " + jsonValue)
      }
    } catch(e) {
        console.log("Failed to read trickLists_data");
    }
      
    //options data
    try {
      const list = await AsyncStorage.getItem("ddlList_data");
      const type = await AsyncStorage.getItem("ddlType_data");
      if(list !== null && type !== null){
        this.setState({ddlList: list});
        this.setState({ddlType: type});
      } else{
        this.storeOptionData();  
      }      
    } catch(e) {
        console.log("Failed to read goals_data");
    }

    //goals data
    try {  
      const jsonValue = await AsyncStorage.getItem("goals_data")
      if(jsonValue != null){
        this.setState({goals: JSON.parse(jsonValue)});
      } else{
        this.storeGoalsData();
      }  
    } catch(e) {
        console.log("Failed to read goals_data");
    }    
  }

  componentDidMount() {
    this.loadAsyncData();
  }

  render() {    
    const {theme} = this.props;

    const data = (type) => {
      const newData = [];
      if(this.state.trickLists){
        this.state.trickLists.filter(trickList => trickList.type === type).forEach(trickList => newData.push({"label": trickList.name, "value": trickList}))
      }
      return newData;  
    }

    const getTrick = () => {
      if(this.state.ddlList != ''){
        let newTrick;
        do{
            newTrick = this.state.ddlList.tricks[Math.floor(Math.random() * this.state.ddlList.tricks.length)];
        } while (newTrick == this.state.trick)
        this.setState({trick: newTrick.name});
        this.storeOptionData();
      } else{
        ToastAndroid.show("Please choose a list", ToastAndroid.SHORT)
      }
    }

    return (    
      <View style={{backgroundColor: "#fff", flex: 1}}>                 
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.choosers}>
            <Text style={styles.title}>Trick Chooser</Text>            
            <View style={styles.dropDownContainer}>

              <View style={styles.dropDown}>
                <Dropdown 
                  label="Type"
                  useNativeDriver={true}
                  onChangeText={(value) => {
                    this.setState({ddlType: value,ddlList: ''});
                    this.storeOptionData();
                  }}
                  value={this.state.ddlType}
                  data={[{label:"Rails", value: "rails"}, {label:"Jumps",value: "jumps"}, {label:"Pipe",value: "pipe"}]}/>
              </View>

              <View style={styles.dropDown}>
                <Dropdown 
                  style={styles.dropDown}
                  label="TrickList"
                  useNativeDriver={true}
                  onChangeText={(value) => {
                    this.setState({ddlList: value});
                    this.storeOptionData();
                  }}
                  value={this.state.ddlList}
                  data={data(this.state.ddlType)} />  
                </View>

            </View>

            <Button                 
              mode="contained" 
              color={theme.colors.primary} 
              onPress={() => getTrick()}
            >
              Choose
            </Button>

            <View style={styles.trickContainer}>
              <Text style={styles.trickText}>{Utils.toCaps(this.state.trick)}</Text>
            </View>

          </View>

          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <View style={styles.goalsOverViewContainer}>
              <Text style={styles.title}>Todays Goals</Text>
              <View style={styles.goalsContainer}>
                {this.state.goals.filter(goal => goal.period === 'day').map(goal => (
                  <View key={goal.id}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("GoalsStack", {screen: "Goals", params: {screen: goal.type}})}>
                      <View style={styles.goalListItem}>
                        <Text style={styles.goalText}>{Utils.toCaps(goal.name)}</Text>                  
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        </View>
    );
  } 
}

export default function(props) {
  const theme = useTheme();

  return <Home {...props} theme={theme} />
}

const styles = StyleSheet.create({  
  container: {
    justifyContent: 'flex-start',
    backgroundColor: "#fff",
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
    marginVertical: 24,
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
  },

  //goals
  goalsOverViewContainer: {
    elevation: 10,
    borderRadius: 6,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
  },
  goalListItem: {
    height: Platform.OS === "ios" ? 34: 38,
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 17
  }
})