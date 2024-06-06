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
import RegularButton from './RegularButton';
import {useNavigation} from '@react-navigation/native';
import ProductButton from './ProductButton';
import QuantityButton from './QuantityButton';

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
  const navigation = useNavigation();

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
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {
          id,
          name,
          category,
          mrp,
          discount,
        })
      }>
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
          <RegularButton name={'bookmark'} IconComp={Feather} />
          {isAddedToCart ? (
            <View style={styles.quantityContainer}>
              <QuantityButton
                onPress={handleDecrease}
                title={'-'}
                btnStyles={styles.btn}
              />
              <Text style={styles.quantityText}>{cartItem?.quantity || 0}</Text>
              <QuantityButton
                onPress={handleIncrease}
                title={'+'}
                btnStyles={styles.btn}
              />
            </View>
          ) : (
            <ProductButton
              title="Add"
              onPress={handleAdd}
              buttonStyle={styles.addButton}
              textStyle={styles.addButtonText}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(350),
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
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
    padding: moderateScale(5),
    borderRadius: moderateScale(3),
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: verticalScale(100),
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: verticalScale(10),
    flex: 1,
  },
  category: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  name: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
    color: 'black',
  },
  quantity: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  mrp: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: moderateScale(14),
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: horizontalScale(5),
  },
  slogan: {
    backgroundColor: '#dfffdf',
    color: 'green',
    textAlign: 'center',
    padding: moderateScale(5),
    borderRadius: moderateScale(3),
    marginTop: verticalScale(5),
  },
  addButton: {
    backgroundColor: 'red',
    padding: moderateScale(10),
    borderRadius: 0,
    alignItems: 'center',
    marginTop: verticalScale(10),
    flex: 1,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  quantityText: {
    marginHorizontal: horizontalScale(10),
    fontSize: moderateScale(16),
    color: 'black',
  },
  btn: {
    height: verticalScale(37),
    flex: 0,
  },
});

export default ProductCard;
