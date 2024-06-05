import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

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
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity({id: item.id}))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity({id: item.id}))}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart({id: item.id}))}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyCart}>Your cart is empty.</Text>
        }
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  itemPrice: {
    fontSize: moderateScale(14),
    color: 'black',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    fontSize: moderateScale(20),
    paddingHorizontal: 10,
    color: '#007bff',
  },
  itemQuantity: {
    fontSize: moderateScale(16),
    marginHorizontal: 10,
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
});
