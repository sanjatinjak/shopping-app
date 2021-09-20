import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as OrderActions from "../../store/actions/orders";
import CustomHeaderButton from "../../components/HeaderButton";
import OrderItem from "../../components/OrderItem";
import Colors from "../../constants/Colors";
import DefaultStyle from "../../constants/DefaultStyle";

const OrderScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(OrderActions.fetchOrders()).then(() => setLoading(false));
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.orders);

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

  if (loading) {
    return (
      <View style={DefaultStyle.spinner}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <OrderItem orders={itemData.item} />}
    />
  );
};

export default OrderScreen;
