import React, {useState, useContext, useEffect}  from 'react';
import {Text} from 'react-native';

import {getUsersCurrentLocation, createNewEntryInUserActivityTable, fetchAllUsersWithSameActivity, sendPushNotification} from './UtilityFunctions';
import {UserContext} from '../App';
import {ActivityContext} from '../screens/MainScreen';
import UserList from './UserList'
import {styles} from './StyleSheet';

export default ActivityViewer = (props) => {

    console.log("!!!!Inside ActivityViewer!!!!");

    const {userDetails, setUserDetails}=useContext(UserContext);
    const {selectedActivity, setSelectedActivity}=useContext(ActivityContext);
    const [usersPerformingSameActivity, setUsersPerformingSameActivity] = useState(null);

    
    useEffect(() => {
        if(selectedActivity!=null && selectedActivity!="")
        {
            var usersLocation="";
            getUsersCurrentLocation()
            .then(response => {
                usersLocation=response;
            })
            .finally(async () => {
                createNewEntryInUserActivityTable(selectedActivity, userDetails, usersLocation)
                .then(async ()=> {
                    fetchAllUsersWithSameActivity(selectedActivity)
                    .then(usersPerformingSameActivity => {
                        setUsersPerformingSameActivity(usersPerformingSameActivity);
                        sendPushNotification(selectedActivity, userDetails, usersPerformingSameActivity);
                    })
                })
            })
        }
    },[selectedActivity]);
    

    if(usersPerformingSameActivity!=null)
    {
        return(
            <UserList usersPerformingSameActivity={usersPerformingSameActivity}/>
        )
    }

    return (
        <>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                "You need imagination in order to imagine a future that doesn't exist". Select an activity from top 
            </Text>
        </>
    );
};
