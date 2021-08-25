import React,{useState, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreenWrapper from './screens/MainScreenWrapper';

export const UserContext = createContext();

export default App = () => {

  console.log("Main App Component Loaded!!!");
  const Stack = createStackNavigator();

  const [userDetails, setUserDetails] = useState({userId:"", fNameLName:"", profilePicURL:"", deviceId:"", userName:""});

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
