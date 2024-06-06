import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import CHeader from '../components/CHeader';
import ProductButton from '../components/ProductButton';
import QuantityButton from '../components/QuantityButton';

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const cartItem = useSelector(state =>
    state.cart.find(item => item.id === route.params.id),
  );
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const initialQuantity = cartItem ? cartItem.quantity : 0;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (route.params) {
      setProduct(route.params);
    }
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [route.params, cartItem]);

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        mrp: product.mrp,
        imageUrl: product.imageUrl,
      }),
    );
    setQuantity(1);
    setIsAddedToCart(true);
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity({id: product.id}));
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity({id: product.id}));
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      dispatch(decreaseQuantity({id: product.id}));
      setIsAddedToCart(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeader
        title={'Product Details'}
        onPress={() => navigation.replace('ProductsScreen')}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/groundnut.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          Product Category:
          <Text style={styles.detailBoldText}> {product.category}</Text>
        </Text>
        <Text style={styles.detailText}>
          Product Name:{' '}
          <Text style={styles.detailBoldText}>{product.name}</Text>
        </Text>
        <Text style={styles.detailText}>
          Price: <Text style={styles.detailBoldText}>₹{product.mrp}</Text>
        </Text>
        <View style={styles.quantityRow}>
          <Text style={styles.qtyTxt}>Quantity: </Text>
          {isAddedToCart ? (
            <View style={styles.quantityContainer}>
              <QuantityButton onPress={handleDecrease} title={'-'} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <QuantityButton onPress={handleIncrease} title={'+'} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: verticalScale(220),
    width: horizontalScale(220),
    borderRadius: moderateScale(20),
  },
  detailsContainer: {
    flex: 1,
    marginTop: verticalScale(20),
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    padding: moderateScale(15),
  },
  detailText: {
    color: 'black',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(10),
  },
  detailBoldText: {
    fontWeight: 'bold',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyTxt: {color: 'black', fontSize: moderateScale(15)},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: horizontalScale(120),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  quantityText: {
    marginHorizontal: horizontalScale(10),
    fontSize: moderateScale(16),
    color: 'black',
  },
  addButton: {
    backgroundColor: 'red',
    padding: moderateScale(10),
    borderRadius: 0,
    alignItems: 'center',
    width: horizontalScale(120),
    height: verticalScale(42),
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
