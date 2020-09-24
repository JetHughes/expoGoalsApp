import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View,TouchableOpacity} from 'react-native';

import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home/Home';
import TrickLibrary from './screens/trickLibrary/TrickLibrary';
import TrickLists from './screens/trickLists/TrickLists';
import AddTricks from './screens/trickLists/AddTricks';
import NewListModal from './screens/trickLists/NewListModal';
import ViewList from './screens/trickLists/ViewList';
import NewGoalModal from './screens/goals/NewGoalModal';
import GoalsScreen from './screens/goals/GoalsScreen';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
    },
};

//Goals
const GoalsTopTabs = createMaterialTopTabNavigator();
function GoalsTobTabsScreen() {
    return (
        <GoalsTopTabs.Navigator>
            <GoalsTopTabs.Screen name='Rails' component={GoalsScreen} initialParams={{type: 'rails'}}/>
            <GoalsTopTabs.Screen name='Jumps' component={GoalsScreen} initialParams={{type: 'jumps'}}/>
            <GoalsTopTabs.Screen name='Pipe' component={GoalsScreen} initialParams={{type: 'pipe'}}/>
        </GoalsTopTabs.Navigator>
    )
}

const GoalsStack = createStackNavigator();
function GoalsStackScreen({route}) {
    return (
        <GoalsStack.Navigator
            initialRouteName="Goals">            
            <GoalsStack.Screen
                name='Goals'
                component={GoalsTobTabsScreen} 
                options={{
                }} 
            />
        </GoalsStack.Navigator>
    )
}

//TrickLists Stack and tabs
const TrickListsStack = createStackNavigator();
function TrickListsStackScreen({navigation, route}) {
    return (
        <TrickListsStack.Navigator
            initialRouteName="Trick Lists"
            headerMode="screen">   
            <TrickListsStack.Screen
                name='Trick Lists'
                component={TrickLists}
                headerMode="screen"   
                options={{
                    headerRight: () => (
                        <View style={{marginRight: 16}}>
                        <TouchableOpacity 
                            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} 
                            onPress={() => navigation.navigate("Tricks")}
                            style={{marginLeft: 16}}
                        >
                            <Icon name="format-list-bulleted" size={24} />
                        </TouchableOpacity>
                    </View>
                    ),
                }}
            />
            <TrickListsStack.Screen 
                name="View List" 
                component={ViewList} 
                options={ ({route}) => ( {
                    headerTitleAlign: "left",
                    headerBackTitleVisible: false,
                    cardShadowEnabled:true,
                    ...TransitionPresets.SlideFromRightIOS, 
                    title: route.params.trickList.name,
                })}
            />
            <TrickListsStack.Screen 
                name="Add Tricks"
                component={AddTricks}
                options={{                    
                    ...TransitionPresets.ModalTransition,    
                    headerLeft: null,
                }}
            />
        </TrickListsStack.Navigator>
    )
}

//Trick Library
const TrickLibraryStack = createStackNavigator();
function TrickLibraryStackScreen() {
    return(
        <TrickLibraryStack.Navigator
            initialRouteName="TrickLibrary">            
            <TrickLibraryStack.Screen
                name='TrickLibrary'
                component={TrickLibraryTopTabsScreen} 
                options={{
                }} 
            />
        </TrickLibraryStack.Navigator>
    )
}

const TrickLibraryTopTabs = createMaterialTopTabNavigator();
function TrickLibraryTopTabsScreen() {
    return(
        <TrickLibraryTopTabs.Navigator
            initialRouteName="RailsTricks" >
            <TrickLibraryTopTabs.Screen name='Rails' component={TrickLibrary} initialParams={{type: "rails"}}/>
            <TrickLibraryTopTabs.Screen name='Jumps' component={TrickLibrary} initialParams={{type: "jumps"}}/>
            <TrickLibraryTopTabs.Screen name='Pipe' component={TrickLibrary} initialParams={{type: "pipe"}}/>
        </TrickLibraryTopTabs.Navigator>
    )

}

//Home
const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator
            initialRouteName="Home">            
            <HomeStack.Screen
                name='Home'
                component={Home}                 
                options={{       
                                 
                }} 
            />
        </HomeStack.Navigator>
    )
}

//Main
const MainBottomTabs = createMaterialBottomTabNavigator();
function MainBottomTabScreens() {
    return (
        <MainBottomTabs.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
            tabBarIcon: ({color }) => {
                let iconName;    
                if (route.name === 'HomeStack') {
                iconName = 'home';
                } else if (route.name === 'GoalsStack') {
                iconName = 'target';
                } else if (route.name === 'TrickListsStack') {
                iconName = 'playlist-check';
                } else if (route.name === 'TrickLibraryStack') {
                iconName = 'library-shelves';
                }
                return <Icon name={iconName} size={24} color={color} />;
            },
            })}
        >
            <MainBottomTabs.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <MainBottomTabs.Screen
                name="GoalsStack"
                component={GoalsStackScreen}
                options={{
                    tabBarLabel: 'Goals',
                }}
            />
            <MainBottomTabs.Screen
                name="TrickListsStack"
                component={TrickListsStackScreen}
                options={{
                    tabBarLabel: 'Trick Lists',
                }}
            />
            <MainBottomTabs.Screen
                name="TrickLibraryStack"
                component={TrickLibraryStackScreen}
                options={{
                    tabBarLabel: 'Trick Library',
                }}                
            />

        </MainBottomTabs.Navigator>
    )
}

const TestStack = createStackNavigator();

const ModalStack = createStackNavigator();
function HomeApp(props) {
    return(
        // <NavigationContainer>
        //     <TestStack.Navigator>
        //         <TestStack.Screen name="Home" component={Home} />
        //     </TestStack.Navigator>
        // </NavigationContainer>
        <NavigationContainer theme={MyTheme}>
        <ModalStack.Navigator
          initialRouteName="RootStack"
          screenOptions={() => ({
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: 'transparent' }
          })}
          mode="modal"
          headerMode="none"
        >                   
          <ModalStack.Screen name="Main" component={MainBottomTabScreens} initialParams={props.goalsData, props.tricksData, props.trickListsData}/>

          {/* modals */}
          <ModalStack.Screen name="NewListModal" component={NewListModal}/>
          {/* <ModalStack.Screen name="NewTrickModal" component={NewTrickModal}/> */}
          <ModalStack.Screen name="NewGoalModal" component={NewGoalModal} />
        </ModalStack.Navigator>
        </NavigationContainer>
    )
}

export default HomeApp;