import React, {useContext}  from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import { Avatar, Button} from 'react-native-paper';
import {styles} from './StyleSheet';
import {UserContext} from '../screens/MainScreenWrapper';

export default UserList = (props) => {
    var usersPerformingSameActivity=props.usersPerformingSameActivity;
    const {userDetails, setUserDetails}=useContext(UserContext);


    if(usersPerformingSameActivity!=null && Object.keys(usersPerformingSameActivity).length>0)
    {
        return(
            <View style={{height: 400}} >
                <ScrollView horizontal= {true} decelerationRate={0} snapToInterval={Dimensions.get('window').width - 60} snapToAlignment={"center"} contentInset={{top: 0,left: 30,bottom: 0,right: 30,}} >
                    {
                        Object.keys(usersPerformingSameActivity).map(key => 
                            <View key={key} style={styles.card}>
                                <Text>{"\n"}</Text>
                                <Avatar.Image size={70} source={{ uri:usersPerformingSameActivity[key].profilePicURL }}/>
                                <Text>{"\n"}</Text>
                                <Text style={[styles.cardText, styles.boldText]} >
                                    {key==userDetails.userId ? "It's you" : usersPerformingSameActivity[key].fNameLName}
                                </Text>
                                <Text style={styles.cardText}>{usersPerformingSameActivity[key].location}</Text>
                                <Text>{"\n"}</Text>
                                {
                                    key==userDetails.userId || usersPerformingSameActivity[key].userName=="" || usersPerformingSameActivity[key].userName==null
                                    ? 
                                        <Text></Text>
                                    : 
                                        
                                    <Button mode="contained" onPress={() => Linking.openURL('https://m.me/'+usersPerformingSameActivity[key].fNameLName)} >
                                        Chat on Messenger
                                    </Button>
                                }
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        );
    }


    return (
        <>
            <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
                Users list will come here 
            </Text>
        </>
    );

};