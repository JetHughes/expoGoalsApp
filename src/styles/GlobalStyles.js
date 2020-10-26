import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    headerRight: {
      flexDirection: 'row',
      marginRight: 16
    },
    headerButton: {
      marginLeft: 24
    },
    modalScreen: {      
      width: 280,
      backgroundColor: 'white',
      borderRadius: 6,
      backgroundColor: '#FFF',
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowOffset: {width: 1, height: 1},
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionsContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 8,
      marginRight: 8,
      marginTop: 28
    },
    actionButton: {
      marginLeft: 8,
      color: '#0066FF',
      fontWeight: '500',
      fontSize: 14,
      minWidth: 64,
      paddingHorizontal: 8,
      height: 36,
      paddingTop: 8
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: '500',
      letterSpacing: 0.15,
      marginBottom: 20
    },
    modalText: {
      fontSize: 16,
      letterSpacing: 0.5
    },
    textInput: {
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#0066FF',
      paddingBottom: 8,
      marginTop: 24,
      fontSize: 17
    },
    menuItem: {
      height: 48,
      width: '100%',
      paddingVertical: 8,
      paddingHorizontal: 16
    }
  });

  export default globalStyles