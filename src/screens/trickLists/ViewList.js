import React from 'react';
import Trick from '../../data/classes/Trick';
import globalStyles from '../../styles/GlobalStyles';

//ui components
import {StyleSheet,View,ScrollView,Platform,TextInput,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HideableView from '../../components/HideableView';
import TrickListItem from '../../components/TrickListItem';

class ViewList extends React.Component {
    constructor(props){
        super();

        props.navigation.setOptions({
            headerRight: () => (
                <View style={globalStyles.headerRight}>
                    <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} 
                      onPress={() => this.setState({newTrickInputVisible: true})}
                      style={globalStyles.headerButton}
                   >
                        <Icon name="plus" size={24} />
                    </TouchableOpacity>
                </View>
              )
        });

        this.trickList = props.route.params.trickList;
    }    

    state = {
        tricks: [],
        newTrickInputVisible: false,
        trickNameInputValue: '',
        editTrickInputVisible: false,
    }

    componentDidMount(){
        this.setState({tricks: this.trickList.tricks})
        console.log("Component did update")
    }

    render() {
        const addTrick = (name) => {
            if(name.length > 0){
                this.setState({newTrickInputVisible: false, trickNameInputValue: ''});
    
                const newTricks = this.state.tricks;
                newTricks.unshift(new Trick(name, this.trickList.type));
                this.props.route.params.updateTrickList( this.trickList.id, newTricks);    
            }
        }
    
        const removeTrick = (id) => {
            const newTricks = this.state.tricks.filter(trick => trick.id !== id);
            this.setState({tricks: newTricks});
            this.props.route.params.updateTrickList(this.trickList.id, newTricks);  
        }
    
        const cancel = () => {
            this.setState({newTrickInputVisible: false, trickNameInputValue: ''});
        }

        const editTrick = (id, name) => {
            const newTricks = this.state.tricks;
            newTricks[newTricks.findIndex(trick => trick.id === id)].name = name;
            this.setState({tricks: newTricks});
            this.props.route.params.updateTrickList(this.trickList.id, newTricks);  
        }

        return(
            <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        
            <HideableView visible={this.state.newTrickInputVisible}>
                <View style={styles.trick}>
                     <TextInput
                        autoFocus={true}
                        style={styles.listItemText}
                        placeholder="Trick Name..."
                        value={this.state.trickNameInputValue}
                        onChangeText={value => this.setState({trickNameInputValue: value})
                        }
                     />
                     <Button color="#0066FF" onPress={() => addTrick(this.state.trickNameInputValue)}>SAVE</Button>
                     <Button color="#ff0033" onPress={() => cancel()}>CANCEL</Button>
                </View>
            </HideableView>
 
             <View style={styles.tricksContainer}>
                 {this.state.tricks.map(trick => (
                    <TrickListItem 
                        key={trick.id}
                        trick={trick}
                        removeTrick={removeTrick}
                        editTrick={editTrick}
                    />
                 ))}
             </View>            
         </ScrollView>
        )   
    }
}

export default ViewList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    trick: {
        height: Platform.OS === "ios" ? 44 : 48,
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: "white",
        flexDirection: 'row'
    },
    tricksContainer: {
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
    },
    // title: {
    //     fontSize: 14,
    //     fontWeight: "400",
    //     color: 'gray',
    //     letterSpacing: -0.24,  
    // },
    // titleContainer: {
    //     height: Platform.OS === "ios" ? 58 : 72,
    //     justifyContent: 'flex-end',
    //     paddingBottom: 4,
    //     paddingHorizontal: 16
    // },
    listItemText: {
        flex: 1,
        fontSize: 17
    }
})
