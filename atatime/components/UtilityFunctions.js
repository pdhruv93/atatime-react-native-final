import * as React from 'react';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export const getUsersCurrentLocation=async ()=>{
	var usersLocation="";
	const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
	if (granted === PermissionsAndroid.RESULTS.GRANTED)
	{
		console.log("Location access allowed. Getting current lat long!!");
		await GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 15000,
		})
		.then(async (location) => {
			console.log("Got LAT LONG!! Reverse Geocoding to Get User's Location:("+location.latitude+","+location.longitude+")");
			await axios.get("https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=b0WdZ32qR8PnLSIIfGrwD2nRTYIPcff94IyohAHnYFw"+
				"&at="+location.latitude+","+location.longitude)
            .then(response => {
				try{
					usersLocation=response.data.items[0].address.city+", "+response.data.items[0].address.countryCode;
				}catch(e)
				{
					console.log("Some exception occured while Reverse Geocoding!");
				}
            })
		})
	}
	else
	{
		console.log("Location permission denied!!")
		alert("@@time works best when others know your location. You may allow location access from settings");
	}

	return usersLocation;
}


export const createNewEntryInUserActivityTable=async (acitivityName, userDetails, userLocation)=>{
	console.log("Inside createNewEntryInUserActivityTable():"+acitivityName+":"+userDetails.userId+":"+userLocation);
	console.log("Adding new entry...");
	await database().ref("/userActivities/"+acitivityName+"/"+userDetails.userId)
	.set({
		fNameLName: userDetails.fNameLName, 
		profilePicURL: userDetails.profilePicURL, 
		deviceId: userDetails.deviceId, 
		userName: userDetails.userName,
		location : userLocation,
		startTime: new Date().toString()
	})
	.then(() =>{
		console.log("Successfully added new entry for user in Firebase DB!!");
	})
}


export const fetchAllUsersWithSameActivity =async (acitivityName)=>{
	var usersPerformingSameActivity=null;
	console.log("Fetching all users who are performing same activity:"+acitivityName);
	await database().ref('/userActivities/'+acitivityName)
	.once('value', (snapshot) => {
		usersPerformingSameActivity = snapshot.val();
		console.log("Successfully Fecthed all users who are performing same activity !!");
		//console.log("Users who are performing same activity:"+JSON.stringify(data));
	});
	return usersPerformingSameActivity;
}


export const sendPushNotification =async (acitivityName, currentUserDetails, allUsersPerformingSameActivity)=>{

	console.log("Inside sendPushNotification(). Preparing list of deviceIds to which notification will be sent!!");
	let deviceIds=[];
	Object.keys(allUsersPerformingSameActivity).map(key => {
		if(key!=currentUserDetails.userId)
			deviceIds.push(allUsersPerformingSameActivity[key].deviceId);
	})

	if(deviceIds.length>0)
	{
		axios.post('https://fcm.googleapis.com/fcm/send',{
			"registration_ids": deviceIds,
			"notification": {
				"title": "@@time",
				"body": "There is another user with activity "+acitivityName+". Tap to check!!",
				"icon": "ic_notification",
				"vibrate": 1,
				"sound": 1,
				"priority": "high"
			}
		},
		{
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization' : 'key=AAAA4bWJScI:APA91bEXP3eOGFuC8XHCTql__GJfxZbC-ashdUoMIrKlgg0ahu9jt-ILfkyLnjDioCBFwhe1jZQrneHj0rhSzdyW08ZAhcNokae2G5mEDh5bsCqm5TzfMTZik2w6cDYpHXzDLQmKO65g'
			}
		})
		.then(res => {
			console.log("Successfully Sent Notifications to IDs:"+JSON.stringify(deviceIds));
		})
		.catch((error) => {
			console.log("Some error while sending notifications to devices");
			console.error(error);
		})
	}
	else
	{
		console.log("No DeviceIds to send notifications!!");
	}
	
}