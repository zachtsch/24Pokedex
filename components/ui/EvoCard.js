import { TouchableOpacity, StyleSheet } from "react-native"

const EvoCard = ({ onPress, children }) =>{
  return(
    <TouchableOpacity style={styles.evoSpriteContainer} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  evoSpriteContainer: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
  },
});

export default EvoCard;
