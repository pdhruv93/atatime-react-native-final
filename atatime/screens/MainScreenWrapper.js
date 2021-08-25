import React, {useRef, useContext}  from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';

import {styles} from '../components/StyleSheet';
import Header from '../components/Header';

import {UserContext} from '../App';

export default MainScreenWrapper = (props) => {

    console.log("!!!!Inside MainScreenWrapper!!!!");
    const scrollRef=useRef();
    const {userDetails, setUserDetails}=useContext(UserContext);

    return(
        <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}>
            <StatusBar barStyle="dark-content" />
            <Header scrollRef={scrollRef} />
        </ScrollView>
    )

    return(
    <View style={[styles.screen, styles.redBackground]}>
        <Text style={[styles.text, styles.whiteText, {fontSize: 16}]}>
            wait while we cook the user for you....
        </Text>
    </View>
    )


    };
