import React, { useState } from "react";
import {ScrollView,StyleSheet,Text,View,Platform} from "react-native";
import Utils from '../../Utils';
import Card from '../../components/Card';
import MySwitch from './MySwitch';
import MyPicker from './MyPicker';
import {Button} from "react-native-paper"

export default function TrickGenerator() {

    const [pickedType, setPickedType] = useState("any");
    const [includeSwitch, setIncludeSwitch] = useState(true);
    const [includeHardways, setIncludeHardways] = useState(true);
    const [includePretz, setIncludePretz] = useState(true);
    const [includeFlips, setIncludeFlips] = useState(true);
    const [maxSpin, setMaxSpin] = useState(900);
    const [maxSpinOn, setMaxSpinOn] = useState(360);
    const [maxSpinOff, setMaxSpinOff] = useState(360);
    const [grabDifficulty, setGrabDifficulty] = useState("any");

    const [myTrick, setTrick] = useState([]);

    const chooseTrick = () => {
        const trick = [];
        const type = pickedType === "any" ? Utils.getRandomFromArray(types) : pickedType;

        switch (type){
            case "rails":
                getRailTrick(trick);     
                break;           
            case "jumps":
                getJumpTrick(trick, type);
                break;
            case "pipe":
                getJumpTrick(trick, type);
                break;
        }

        //prevent getting the same trick twice
        if(trick === myTrick) {choose()} 
        setTrick(trick);
    }

    const getRailTrick = (trick) => {
        //calculate values
        const isSwitch = includeSwitch ? Math.random() < 0.4 : false;
        const isHardway = includeHardways ? Math.random() < 0.4 : false;
        const isFrontSide = Math.random() < 0.5;
        const spinOn = Utils.getRandomFromArray(Utils.range(0, maxSpinOn, 90));
        const spinOffIsPretz = includePretz ? Math.random() < 0.4 : false;
        const spinOff = Utils.getRandomFromArray(Utils.range(0, maxSpinOff, 90));

        const isSlideTrick = spinOn%180 !== 0;

        //write trick
        if(isHardway && spinOn > 180) {trick.push("hardway")}
        if(isSwitch) {trick.push("switch")}
        if(spinOn <= 180){
            trick.push(isFrontSide ? "front" : "back");
            trick.push(isSlideTrick ? "board" : "50-50");
        } else {
            Utils.floorToNearest(spinOn, isSlideTrick ? 270 : 180)
            trick.push(isFrontSide ? "front " + spinOn + " on" : "back " + spinOn + " on");
        }
        console.log("spinOff: " + spinOff);
        if(spinOff !== 0) {
            if(isSlideTrick){      
                trick.push(spinOffIsPretz ? "pretz" : "continuing")     
                trick.push(Utils.ceilToNearest(spinOff, 270) + " off");   
            } else {                    
                if((isSwitch && (spinOn/180)%2 === 0) || (isSwitch && (spinOn/180)%2 !== 0)){ //check if they land switch after the spin on
                    trick.push("switch");
                }   
                trick.push(spinOffIsPretz ? "front" : "back") 
                trick.push(Utils.ceilToNearest(spinOff, 180) + " off");     
            }
        }
    }

    const getJumpTrick = (trick, type) => {
        //calc values
        const isHardway = includeHardways ? Math.random() < 0.4 : false;
        const isFrontSide = Math.random() < 0.5;
        const isSwitch = includeSwitch ? Math.random() < 0.4 : false;
        const grab = Utils.getRandomFromArray(grabs.filter(grab => grab.difficulty === grabDifficulty || grabDifficulty === "any"));
        const isFlip = includeFlips ? Math.random() < 0.5 : false;
        const flip = Utils.getRandomFromArray(type === "jumps" ? jumpFlips : pipeFlips);
        const spinIndex = Utils.ceilToNearest(Utils.getRandomBetween(0, maxSpin), 180);

        //write trick
        if(isHardway && !isFlip) {trick.push(type === "jumps" ? "hardway" : "alley oop")}  
        if(isSwitch) {trick.push("switch")}  
        if(isFlip) {
            trick.push(flip)
        }
        else {        
            trick.push(isFrontSide ? "front" : "back");
            trick.push(spinIndex.toString());
        }
        trick.push(grab.name);
    }

    const toggleSwitch = (setState) => setState(previousState => !previousState);

    return(
        <ScrollView>
                        
            <Button style={{margin: 16}} color="rgba(18,18,18,0.88)" onPress={chooseTrick} mode="contained">Choose</Button>

            <View style={styles.trickContainer}>
                {myTrick.filter(item => item.toString().length > 1).map(moduleText => (
                    <View key={Utils.unique()} style={styles.trickListItem}>
                        <Text style={{textAlign: "center", fontSize: 24}}>{Utils.toCaps(moduleText)}</Text>
                    </View>
                ))}
            </View>

            <View style={{paddingTop: 16, backgroundColor: "white", flex: 1}}>

                <Text style={{fontSize: 24, paddingLeft: 16, marginBottom: 16}}>Options</Text>

                <View style={styles.optionsContainer}>                    
                    <MyPicker title="Type" value={pickedType} setValue={setPickedType} data={["any", "rails", "jumps", "pipe"]}/>
                    <MyPicker title="Max Spin" value={maxSpin} setValue={setMaxSpin} data={Utils.range(0, 1800, 180)}/>                    
                    <View style={{flexDirection: "row"}}>
                        <MyPicker title="Max Spin On" value={maxSpinOn} setValue={setMaxSpinOn} data={Utils.range(0, 720, 90)}/>
                        <View style={{width: 8}}></View>
                        <MyPicker title="Max Spin Off" value={maxSpinOff} setValue={setMaxSpinOff} data={Utils.range(0, 720, 90)}/>
                    </View>
                    <MyPicker title="Grab Difficulty" value={grabDifficulty} setValue={setGrabDifficulty} data={["any", "easy", "medium", "hard"]}/>                    
                    
                    <MySwitch title="Include Switch" var={includeSwitch} toggleSwitch={() => toggleSwitch(setIncludeSwitch)} />
                    <MySwitch title="Include Hardway" var={includeHardways} toggleSwitch={() => toggleSwitch(setIncludeHardways)} />
                    <MySwitch title="Include Pretz" var={includePretz} toggleSwitch={() => toggleSwitch(setIncludePretz)} />
                    <MySwitch title="Include Flips" var={includeFlips} toggleSwitch={() => toggleSwitch(setIncludeFlips)} />

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        marginBottom: 48,
        paddingHorizontal: 16,
        elevation: 3
    },
    trickContainer: {
        borderRadius: 6, 
        margin: 16, 
        elevation: 1, 
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
        paddingVertical: 12, 
        backgroundColor: "white",
        alignItems: "center",
        elevation: 3
    },
    trickListItem: {
        height: 38
    }
})

const types = ["rails", "jumps", "pipe"];

class Grab {
    constructor(name, diffuculty){
        this.name = name ? name : "";
        this.difficulty = diffuculty ? diffuculty : "";
    }
}

const grabs = [
    new Grab("nose", "easy"),
    new Grab("mute", "easy"),
    new Grab("indy", "easy"),
    new Grab("stalefish", "easy"),
    new Grab("melon", "easy"),
    new Grab("tail", "easy"),
    new Grab("roast beef", "easy"),

    new Grab("crail", "medium"),
    new Grab("chicken salad", "medium"),
    new Grab("japan", "medium"),
    new Grab("suitcase", "medium"),
    new Grab("tuck knee", "medium"),
    new Grab("seat belt", "medium"),
    new Grab("tai pan", "medium"),
    new Grab("canadian bacon", "medium"),

    new Grab("rocket air", "hard"),
    new Grab("cross rocket", "hard"),
    new Grab("double tail", "hard"),
    new Grab("bloody dracula", "hard"),
    new Grab("method", "hard"),
];

const jumpFlips = ["wildcat", "tamedog", "front bazza", "back bazza", "underflip 540", "chicane", "underflip 720", "back rodeo 540", "front rodeo 540", "back rodeo 720", "back rodeo 900", "front rodeo 720"]
const pipeFlips = ["backy", "fronty", "crippler", "crippler 7", "mcTwist", "alley oop mcTwist", "haakon", "michaelchuk"]