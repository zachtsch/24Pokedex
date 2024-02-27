import { TouchableOpacity, StyleSheet } from 'react-native';

const PressableCard = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    backgroundColor: 'white',
    padding: 5,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
  },
});

export default PressableCard;
