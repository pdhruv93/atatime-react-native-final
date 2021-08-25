import React, {useContext}  from 'react';
import {Text,View} from 'react-native';
import {AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';

import {styles} from '../components/StyleSheet';
import FBLoginButton from '../components/FBLoginButton';
import {UserContext} from '../App';

export default LoginScreen = (props) => {

    const {userDetails, setUserDetails}=useContext(UserContext);

    setTimeout(() =>{
        AccessToken.getCurrentAccessToken()
        .then(data => {
            if(data!=null)
            {
                console.log("User has correct Access Toekn, fetching userId using Graph Request...");
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
                                props.navigation.replace('MainScreenWrapper');
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
    } , 1000);



    return (

        <View style={[styles.screen, styles.redBackground]}>
            <Text style={[styles.boldText, styles.whiteText, {fontSize: 32}]}>
                We've got what you need!  
            </Text>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                mark your current activity with Tags. and check how many others are doing the same activity...And thats it. @@time is ready!!
            </Text>
            <Text>{"\n"}</Text>
            <FBLoginButton navigation={props.navigation}/>
        </View>

    );
};