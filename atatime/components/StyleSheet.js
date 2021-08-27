import {Dimensions,StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    screen: {
      display: 'flex',
      flexDirection: 'column', 
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    redBackground: {
      backgroundColor: '#F05F40',
    },
  
    blueBackground: {
      backgroundColor: '#007bff',
    },

    whiteBackground: {
      backgroundColor: 'white',
    },
  
    text:{
        textAlign: "center", 
        margin: 20
    },

    whiteText:{
      color: "white"
    },

    boldText:{
        fontWeight: "bold"
    },

    scrollButton : {
      textTransform: 'uppercase',
      borderRadius: 300,
      padding: 15,
      minWidth: "50%",
      marginTop: 30
    },

    card: {
      marginTop: 100,
      backgroundColor: '#F05F40',
      width: Dimensions.get('window').width - 80,
      margin: 10,
      height: 250,
      borderRadius: 10,
      opacity: 0.9,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 2,
      display: 'flex',
      alignItems: 'center',
      padding: 15
    },

    cardText :{
        fontSize: 18, 
        color:"white"
    },

    roundedImage:{
      borderRadius: 50
    }
  
  });
