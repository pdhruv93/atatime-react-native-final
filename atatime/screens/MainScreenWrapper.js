import React, {useState, useRef, useEffect, createContext}  from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {styles} from '../components/StyleSheet';
import Header from '../components/Header';
import MainScreen from './MainScreen';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';


export const UserContext = createContext();

export default MainScreenWrapper = (props) => {

    console.log("!!!!Inside MainScreenWrapper!!!!");
    const scrollRef=useRef();
    const [userDetails, setUserDetails] = useState(null);


    if(userDetails!=null && userDetails.deviceId=="")
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


    useEffect(() => {
        //Connecting to Firebase and Getting User Details
        AccessToken.getCurrentAccessToken()
        .then(data => {
            if(data!=null)
            {
                console.log("User has correct Access Token, fetching userId using Graph Request...");
                const processRequest = new GraphRequest('/me?fields=name,picture.type(large)',null,(error, result)=>{
                    if(!error)
                    {  
                        var userId=result.id;
                        console.log("UserId of currently logged in user is:"+userId+". Fetching User details from Firebase's User table!!");
                        database().ref('/user/'+userId)
                        .on('value', snapshot => {
                            if(snapshot!=null)
                            {
                                var user={
                                    userId: snapshot.val().userId,
                                    fNameLName: snapshot.val().fNameLName,
                                    profilePicURL: snapshot.val().profilePicURL,
                                    userName: snapshot.val().userName,
                                    deviceId : snapshot.val().deviceId
                                };

                                setUserDetails(user);
                                console.log("User details set to Context. Redirecting to MainScreenWrapper!!");
                            }
                            else
                            {
                                console.log("Could not get Data from User Table of Firebase. Not continuing!!");
                            }
                        }); 
                    }
                    else
                    {
                        console.log("Error occured when doing a GraphRequest inside FBLoginButton.js!!");
                    }
                });
                // Start the graph request(sync call).
                new GraphRequestManager().addRequest(processRequest).start();
            }
        });
    }, []);
    

    

    if(userDetails!=null)
    {
        return(
            <UserContext.Provider value={{userDetails, setUserDetails}} >
                <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}>
                    <StatusBar barStyle="dark-content" />
                    <Header scrollRef={scrollRef} />
                    <MainScreen navigation={props.navigation} scrollRef={scrollRef}/>
                </ScrollView>
            </UserContext.Provider>
        )
    }
    
    return(
        <View style={[styles.screen, styles.redBackground]}>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                wait while we cook the user for you....
            </Text>
        </View>
    )


    };
