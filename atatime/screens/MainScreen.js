import React, {createContext, useState, useContext} from 'react';
import {Text, View, Linking} from 'react-native';
import { Button, TextInput  } from 'react-native-paper';
import FBLoginButton from '../components/FBLoginButton';
import ActivitiesList from '../components/ActivitiesList';
import {styles} from '../components/StyleSheet';
import {UserContext} from '../App';
import database from '@react-native-firebase/database';


export const ActivityContext = createContext();


export default MainScreen = (props)=> {
    console.log("!!!!Inside MainScreen!!!!");

    const {userDetails, setUserDetails}=useContext(UserContext);

    const[selectedActivity, setSelectedActivity] = useState("");
    const [text, setText] = useState(userDetails.userName);

    return(
        <ActivityContext.Provider value={{selectedActivity, setSelectedActivity}}>
            <View style={[styles.screen, styles.redBackground]}>
                <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]} >
                    Tag your activities
                </Text>
                <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                    choose the tag which closely relates to your activity
                </Text>
            
                <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-evenly', padding: 20}}>
                    <ActivitiesList scrollRef={props.scrollRef} />
                </View>
            </View>


            <View style={[styles.screen, styles.blueBackground]}>
                <Text>{"\n"}</Text> 
                <Button color="white" mode="contained" style={styles.scrollButton} onPress={()=>{props.scrollRef.current?.scrollTo({x: 0, y: 0})}} >
                    Cool!! Tag More Activities
                </Button>
            </View>


            <View style={[styles.screen, styles.redBackground]}>
                <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 32}]}>
                    Profile and Preferences
                </Text>
                <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                    provide your username to let other users connect you on messenger
                </Text>

                <TextInput value={text} style={{width: 200, height: 50}} onChangeText={text => setText(text)}/>
                <Button mode="contained" onPress={() => {
                    database().ref('/user/'+userDetails.userId)
                    .update({
                        userName: text,
                    })
                    .then(() => console.log('User Screename updated to Firebase!!'));
                }} >
                    Submit
                </Button>

                <Text>{"\n\n\n\n"}</Text>

                <FBLoginButton navigation={props.navigation} />

                <Text>{"\n"}</Text>
                <Button icon="heart" mode="contained" onPress={() => Linking.openURL('https://m.me/greenpandey')} >
                    Say Hi to Developer
                </Button>

            </View>
        </ActivityContext.Provider>
    );
};