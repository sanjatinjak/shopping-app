import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.allProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
