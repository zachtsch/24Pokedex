import { View, Text, StyleSheet } from 'react-native';

const SkeletonCard = () => {
  return <View style={styles.cardContainer}></View>;
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
    justifyContent: 'space-between',
    margin: 2,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
  },
});

export default SkeletonCard;
