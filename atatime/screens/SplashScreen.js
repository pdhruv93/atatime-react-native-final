import * as React from 'react';
import {View, Text } from 'react-native';

import {styles} from '../components/StyleSheet';

export default function SplashScreen({navigation}) {

    setTimeout(() =>{
        //Wait for 4seconds and then redirect to LoginScreen
        navigation.replace('LoginScreen');
    }, 4000);

  return (
    <View style={[styles.screen, styles.redBackground]}>

      <Text style={[styles.text, styles.whiteText, styles.boldText, {fontSize: 40}]}>
        @@time
      </Text>

    </View>
  );
}