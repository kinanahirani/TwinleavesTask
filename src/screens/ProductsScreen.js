import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useApi} from '../hooks/useApi';
import ProductCard from '../components/ProductCard';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import RegularButton from '../components/RegularButton';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductsScreen = ({navigation}) => {
  const {getProducts} = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(page, 10);
      setProducts(prevProducts => [...prevProducts, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      fetchProducts();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="black" style={{flex: 1}} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: moderateScale(15),
          }}>
          My Smart Basket
        </Text>
        <View style={{flexDirection: 'row'}}>
          <RegularButton
            name={'barcode-scan'}
            IconComp={MaterialCommunityIcons}
            onPress={() => navigation.navigate('BarcodeScannerScreen')}
          />
          <RegularButton
            name={'shopping-cart'}
            IconComp={Feather}
            onPress={() => navigation.navigate('CartScreen')}
          />
          <RegularButton
            name={'user'}
            IconComp={Feather}
            onPress={() => navigation.navigate('ProfileScreen')}
          />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.gtin}
        renderItem={({item, index}) => (
          <ProductCard
            id={item.gtin}
            name={item.name}
            category={item.main_category}
            mrp={item.mrp?.mrp}
            originalPrice={item.originalPrice}
            discount={item.discount}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: '#rgba(0, 0, 0, 0.2)',
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
});

export default ProductsScreen;
