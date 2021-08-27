import React, {useContext}  from 'react';
import {Text,View} from 'react-native';
import {AccessToken} from 'react-native-fbsdk';
import {styles} from '../components/StyleSheet';
import FBLoginButton from '../components/FBLoginButton';

export default LoginScreen = (props) => {

    setTimeout(() =>{
        AccessToken.getCurrentAccessToken()
        .then(data => {
            if(data!=null)
            {
                console.log('User has correct access Token Redirecting to MainScreenWrapper!!! Response');
                props.navigation.replace('MainScreenWrapper');
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