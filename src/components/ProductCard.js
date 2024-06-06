import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../redux/slices/cartSlice';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const ProductCard = ({
  id,
  name,
  category,
  mrp,
  originalPrice,
  imageUrl,
  discount,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.find(item => item.id === id),
  );

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const initialQuantity = cartItem ? cartItem.quantity : 0;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartItem]);

  const handleAdd = () => {
    dispatch(addToCart({id, name, mrp, imageUrl}));
    setQuantity(1);
    setIsAddedToCart(true);
  };

  const handleIncrease = () => {
    if (quantity <= 0) {
      setQuantity(0);
      dispatch(addToCart({id, name, originalPrice, imageUrl}));
    } else {
      dispatch(increaseQuantity({id}));
    }
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({id}));
    setQuantity(prevQuantity => prevQuantity - 1);
  };

  return (
    <View style={styles.card}>
      {discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
      )}
      <Image
        source={require('../assets/images/groundnut.jpg')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>1 kg</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.mrp}>₹{mrp}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          )}
        </View>
        <View style={{flexGrow: 1}} />
        <Text style={styles.slogan}>Har Din Sasta!</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
              borderColor: 'gray',
              borderWidth: 1,
              marginRight: 5,
            }}>
            <Feather name="bookmark" size={moderateScale(18)} color={'black'} />
          </TouchableOpacity>
          {isAddedToCart ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.quantityButton}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cartItem?.quantity || 0}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '43%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: moderateScale(10),
    margin: moderateScale(10),
    elevation: 3,
    position: 'relative',
    width: horizontalScale(200),
    marginTop: verticalScale(10),
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 3,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 10,
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  name: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'black',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  mrp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  slogan: {
    backgroundColor: '#dfffdf',
    color: 'green',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  quantityButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default ProductCard;
