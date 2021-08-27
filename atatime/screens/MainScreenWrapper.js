import React, {useRef, useContext}  from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {styles} from '../components/StyleSheet';
import Header from '../components/Header';
import MainScreen from './MainScreen';
import {UserContext} from '../App';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export default MainScreenWrapper = (props) => {

    console.log("!!!!Inside MainScreenWrapper!!!!");
    const scrollRef=useRef();
    const {userDetails, setUserDetails}=useContext(UserContext);

    if(userDetails.deviceId=="")
    {
        console.log("Registering User to recieve Firebase notifications...");
        messaging().registerDeviceForRemoteMessages()
        .then(()=>{
            messaging().getToken()
            .then((token)=>{
                console.log("New Firebase Messaging Token recieved!!");
                database().ref('/user/'+userDetails.userId)
                .update({
                    deviceId: token,
                })
                .then(() => console.log('DeviceId updated to Firebase!!'));
            })
        })
    }
    

    return(
        <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} />
            <MainScreen navigation={props.navigation} scrollRef={scrollRef}/>
        </ScrollView>
    )

    
    return(
    <View style={[styles.screen, styles.redBackground]}>
        <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
            wait while we cook the user for you....
        </Text>
    </View>
    )


    };
