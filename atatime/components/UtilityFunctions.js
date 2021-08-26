import * as React from 'react';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

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


export const createNewEntryInUserActivityTable=async (acitivityName, userId, userLocation)=>{
	
}