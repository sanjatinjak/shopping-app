import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomHeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders);

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
    });
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem orders={itemData.item} />}
    />
  );
};

export default OrderScreen;
