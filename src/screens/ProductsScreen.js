// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import {useApi} from '../hooks/useApi';
// import ProductCard from '../components/ProductCard';
// import {moderateScale} from '../helpers/sizeHelpers';
// import RegularButton from '../components/RegularButton';

// const ProductsScreen = ({navigation}) => {
//   const {getProducts} = useApi();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [loadingMore, setLoadingMore] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts(page);
//       setProducts(prevProducts => [...prevProducts, ...data]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   const handleEndReached = () => {
//     if (!loadingMore) {
//       setLoadingMore(true);
//       setPage(prevPage => prevPage + 1);
//       fetchProducts();
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}} />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Error: {error}</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Text
//           style={{
//             color: 'black',
//             fontWeight: 'bold',
//             fontSize: moderateScale(15),
//           }}>
//           My Smart Basket
//         </Text>
//         <View style={{flexDirection: 'row'}}>
//           <RegularButton
//             name={'shopping-cart'}
//             onPress={() => navigation.navigate('CartScreen')}
//           />
//           <RegularButton
//             name={'user'}
//             onPress={() => navigation.navigate('ProfileScreen')}
//           />
//         </View>
//       </View>
//       <FlatList
//         data={products}
//         keyExtractor={index => index}
//         renderItem={({item, index}) => (
//           <ProductCard
//             id={index}
//             name={item.name}
//             category={item.main_category}
//             mrp={item.mrp?.mrp}
//           />
//         )}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         onEndReached={handleEndReached}
//         onEndReachedThreshold={0.1}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#rgba(0, 0, 0, 0.2)',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   productContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productCategory: {
//     fontSize: 14,
//     color: '#555',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: '#000',
//   },
// });

// export default ProductsScreen;

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
import {moderateScale} from '../helpers/sizeHelpers';
import RegularButton from '../components/RegularButton';

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
      const data = await getProducts(page);
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
            name={'shopping-cart'}
            onPress={() => navigation.navigate('CartScreen')}
          />
          <RegularButton
            name={'user'}
            onPress={() => navigation.navigate('ProfileScreen')}
          />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={index => index}
        renderItem={({item, index}) => (
          <ProductCard
            id={index}
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
    padding: 10,
    backgroundColor: '#rgba(0, 0, 0, 0.2)',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductsScreen;
