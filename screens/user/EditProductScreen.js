import React, {useEffect, useState, useCallback, useReducer} from 'react';
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

const UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.payload,
    };

    const updateValid = {...state.inputValid, [action.inputId]: action.isValid};
    let formIsValid = true;
    for (const key in updateValid) {
      formIsValid = formIsValid && updateValid[key];
    }
    return {
      formValid: formIsValid,
      inputValues: updatedValues,
      inputValid: updateValid,
    };
  }

  return state;
};

const EditProductScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  let id;
  if (route.params) {
    id = route.params.productId;
  }

  const product = useSelector(state =>
    state.products.userProducts.find(product => product.id === id),
  );

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      price: '',
      description: product ? product.description : '',
    },
    inputValid: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
    formValid: false,
  });

  const submitHandler = () => {
    if (product) {
      dispatch(
        ProductActions.updateProduct(
          id,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        ),
      );
    } else {
      dispatch(
        ProductActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
        ),
      );
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit product' : 'Add new product',
    });
  }, [id]);

  const changeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchForm({
      type: UPDATE,
      payload: text,
      isValid: isValid,
      inputId: inputIdentifier,
    });
  };
  console.log(formState.inputValid);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={text => changeHandler('title', text)}
            returnKeyType="next"
          />
          {!formState.inputValid.title && (
            <Text style={styles.error}>Enter valid title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={text => changeHandler('imageUrl', text)}
          />
          {!formState.inputValid.imageUrl && (
            <Text style={styles.error}>Enter valid image URL</Text>
          )}
        </View>
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={text => changeHandler('price', text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={text => changeHandler('description', text)}
          />
          {!formState.inputValid.description && (
            <Text style={styles.error}>Enter valid description</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableCmp onPress={submitHandler} disabled={!formState.formValid}>
            <View
              style={[
                DefaultStyle.button,
                {backgroundColor: formState.formValid ? '#444a5c' : '#888'},
              ]}>
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
    margin: 10,
  },
  error: {
    fontFamily: Fonts.lemonLight,
    fontSize: 12,
    color: 'red',
    textTransform: 'capitalize',
  },
});

export default EditProductScreen;
