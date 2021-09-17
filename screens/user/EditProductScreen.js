import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';

import TouchableCmp from '../../components/TouchableCmp';
import * as ProductActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/HeaderButton';
import Fonts from '../../constants/Fonts';
import DefaultStyle from '../../constants/DefaultStyle';

const EditProductScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  let id;
  if (route.params) {
    id = route.params.productId;
  }

  const product = useSelector(state =>
    state.products.userProducts.find(product => product.id === id),
  );

  const [productTitle, setTitle] = useState(product ? product.title : '');
  const [productPrice, setPrice] = useState(
    product ? product.price.toString() : '',
  );
  const [productImageUrl, setImageUrl] = useState(
    product ? product.imageUrl : '',
  );
  const [productDescription, setDescription] = useState(
    product ? product.description : '',
  );

  const submitHandler = () => {
    if (product) {
      dispatch(
        ProductActions.updateProduct(
          id,
          productTitle,
          productDescription,
          productImageUrl,
        ),
      );
    } else {
      dispatch(
        ProductActions.createProduct(
          productTitle,
          productDescription,
          productImageUrl,
          +productPrice,
        ),
      );
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit product' : 'Add new product',
    });
  }, [id]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={productTitle}
            onChangeText={text => {
              setTitle(text);
            }}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={productImageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={productPrice}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={productDescription}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableCmp onPress={submitHandler}>
            <View style={[DefaultStyle.button, {backgroundColor: '#444a5c'}]}>
              <Text style={DefaultStyle.buttonText}>Submit</Text>
            </View>
          </TouchableCmp>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.lemonRegular,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 10
  }
});

export default EditProductScreen;
