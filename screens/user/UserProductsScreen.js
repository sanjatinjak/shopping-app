import React, {useEffect} from 'react';
import {FlatList, View, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as ProductActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import DefaultStyle from '../../constants/DefaultStyle';
import TouchableCmp from '../../components/TouchableCmp';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
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
            title="Add"
            iconName="add-box"
            onPress={() => props.navigation.navigate('EditProduct')}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const deleteHandler = id => {
    Alert.alert('Are you sure ?', 'Do you want to delete this item ?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(ProductActions.deleteProduct(id)),
      },
    ]);
  };
  const onSelectHandler = id => {
    props.navigation.navigate('EditProduct', {
      productId: id,
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => {}}
          onSelect={() => onSelectHandler(itemData.item.id)}>
          <TouchableCmp onPress={() => onSelectHandler(itemData.item.id)}>
            <View style={[DefaultStyle.button, {backgroundColor: '#444a5c'}]}>
              <Text style={DefaultStyle.buttonText}>Edit</Text>
            </View>
          </TouchableCmp>

          <TouchableCmp onPress={() => deleteHandler(itemData.item.id)}>
            <View style={[DefaultStyle.button, {backgroundColor: 'red'}]}>
              <Text style={DefaultStyle.buttonText}>Delete</Text>
            </View>
          </TouchableCmp>
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
