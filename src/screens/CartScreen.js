import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import CHeader from '../components/CHeader';
import QuantityButton from '../components/QuantityButton';

const CartScreen = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../assets/images/groundnut.jpg')}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.mrp}</Text>
        <View style={styles.quantityContainer}>
          <QuantityButton
            onPress={() => dispatch(decreaseQuantity({id: item.id}))}
            title={'-'}
            btnStyles={styles.btn}
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <QuantityButton
            onPress={() => dispatch(increaseQuantity({id: item.id}))}
            title={'+'}
            btnStyles={styles.btn}
          />
        </View>
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart({id: item.id}))}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CHeader title="Cart" extraStyles={{marginBottom: verticalScale(10)}} />
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyCart}>Your cart is empty.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(10),
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
    padding: moderateScale(10),
    backgroundColor: '#f8f8f8',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
  },
  itemImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
  },
  itemDetails: {
    flex: 1,
    marginLeft: horizontalScale(10),
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
    color: 'black',
  },
  itemPrice: {
    fontSize: moderateScale(14),
    color: 'black',
    marginBottom: verticalScale(10),
  },
  quantityContainer: {
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    width: horizontalScale(120),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  quantityButton: {
    fontSize: moderateScale(20),
    paddingHorizontal: horizontalScale(10),
    color: '#007bff',
  },
  itemQuantity: {
    fontSize: moderateScale(16),
    marginHorizontal: horizontalScale(10),
    color: 'black',
  },
  removeButton: {
    color: '#ff0000',
    fontSize: moderateScale(14),
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: moderateScale(18),
    marginTop: verticalScale(20),
    color: 'black',
  },
  btn: {
    width: horizontalScale(40),
    flex: 0,
  },
});
