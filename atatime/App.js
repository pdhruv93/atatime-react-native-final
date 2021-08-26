import React,{useState, createContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreenWrapper from './screens/MainScreenWrapper';
import messaging from '@react-native-firebase/messaging';

export const UserContext = createContext();

export default App = () => {

  console.log("Main App Component Loaded!!!");
  const Stack = createStackNavigator();

  const [userDetails, setUserDetails] = useState({userId:"", fNameLName:"", profilePicURL:"", deviceId:"", userName:""});


  useEffect(()=>{
      console.log("Registering App for recieving background push notifications from Firebase!!");
      messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
  });
  }, [])


  return (
    <NavigationContainer>
        <UserContext.Provider value={{userDetails, setUserDetails}} >
          <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="MainScreenWrapper" component={MainScreenWrapper}/>
          </Stack.Navigator>
        </UserContext.Provider>
    </NavigationContainer>    
  );

};
