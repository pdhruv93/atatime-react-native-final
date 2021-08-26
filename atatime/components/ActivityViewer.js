import React from 'react';
import {Text} from 'react-native';
import {getUsersCurrentLocation} from './UtilityFunctions';

export default ActivityViewer = (props) => {

    getUsersCurrentLocation()
    .then(usersLocation => {
        console.log("::::::"+usersLocation);
    })

    return (
        <>
            <Text>Hello</Text>
        </>
    );
};
