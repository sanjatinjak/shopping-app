import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/actions/cart';
import ProductItem from '../../components/ProductItem';
import CustomHeaderButton from '../../components/HeaderButton';
import TouchableCmp from '../../components/TouchableCmp';
import DefaultStyle from '../../constants/DefaultStyle';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName="shopping-cart"
            onPress={() => props.navigation.navigate('Cart')}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const selectHandler = id => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          product={itemData.item}
          onSelect={() => selectHandler(itemData.item.id)}>
          <TouchableCmp onPress={() => selectHandler(itemData.item.id)}>
            <View style={[DefaultStyle.button, {backgroundColor: '#db5f12'}]}>
              <Text style={DefaultStyle.buttonText}>View details</Text>
            </View>
          </TouchableCmp>

          <TouchableCmp
            onPress={() => dispatch(CartActions.addToCart(itemData.item))}>
            <View style={DefaultStyle.button}>
              <Text style={DefaultStyle.buttonText}>Add to cart</Text>
            </View>
          </TouchableCmp>
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
