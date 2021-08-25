import React, {useContext}  from 'react';
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';
import {UserContext} from '../App';

export default FBLoginButton = (props) => {

    const {userDetails, setUserDetails}=useContext(UserContext);

    return(
        <LoginButton 
            publishPermissions={["email"]}
            onLoginFinished=
            {
                (error, result) => {
                    if (error) {
                        alert("Login failed with error: " + error.message);
                        console.log("User pressed Login Button and landed upto error"+JSON.stringify(error));
                    } 
                    else if (result.isCancelled) {
                        console.log("User pressed Login Button and then somehow Login was cancelled");
                    } 
                    else{
                        console.log("User pressed Login Button and login was successful!!");

                        AccessToken.getCurrentAccessToken()
                        .then(data => {
                            if(data!=null)
                            {
                                //If AccessToken is present, get the User Details using Graph Request
                                const processRequest = new GraphRequest('/me?fields=name,picture.type(large)',null,(error, result)=>{
                                    if(!error)
                                    {  
                                        var user={
                                            userId: result.id,
                                            fNameLName: result.name,
                                            profilePicURL: result.picture.data.url,
                                            userName: "",   //FB has stopped provided userName or screenName
                                            deviceId : ""   //Will be populated later
                                        };

                                        console.log("Creating entry for user in the Users table...(UserId="+result.id+")");
                                        database().ref('/user/'+result.id)
                                        .set(user)
                                        .then(() =>{
                                            console.log('User Table Updated at Firebase Side...Now redirecting to MainScreenWrapper!!')
                                            setUserDetails(user);
                                            props.navigation.replace('MainScreenWrapper');
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
                    }
                }
            }


            onLogoutFinished={() => {
                console.log("User has logged Out!!");
                props.navigation.replace('LoginScreen');
            }}  
        />
    )
}