import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";

import * as ProductActions from "../../store/actions/products";
import CustomHeaderButton from "../../components/HeaderButton";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";

const UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.payload,
    };

    const updateValid = {
      ...state.inputValid,
      [action.inputId]: action.isValid,
    };
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

const EditProductScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  let id;
  if (route.params) {
    id = route.params.productId;
  }

  const product = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === id)
  );

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: 0,
      description: product ? product.description : "",
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
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        ProductActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: id ? "Edit product" : "Add new product",
    });
  }, [id]);

  const changeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (inputIdentifier === "price") {
      const num = parseInt(text);
      if (num > 0 && num < 1000000) {
        isValid = true;
      }
    } else {
      text.trim().length > 0;
      isValid = true;
    }

    dispatchForm({
      type: UPDATE,
      payload: text,
      isValid: isValid,
      inputId: inputIdentifier,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="title"
            keyboardType="default"
            errorText="Please enter valid title."
            returnKeyType="next"
            value={formState.inputValues.title}
            onChangeHandler={changeHandler}
            isInputValid={formState.inputValid.title}
          />
          <Input
            label="imageUrl"
            keyboardType="default"
            errorText="Please enter valid image URL."
            value={formState.inputValues.imageUrl}
            onChangeHandler={changeHandler}
            isInputValid={formState.inputValid.imageUrl}
          />
          {product ? null : (
            <Input
              label="price"
              keyboardType="numeric"
              errorText="Please enter valid price."
              value={formState.inputValues.price}
              onChangeHandler={changeHandler}
              isInputValid={formState.inputValid.price}
            />
          )}
          <Input
            label="description"
            keyboardType="default"
            errorText="Please enter valid description."
            multiline
            numberOfLines={3}
            value={formState.inputValues.description}
            onChangeHandler={changeHandler}
            isInputValid={formState.inputValid.description}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              onPressHandler={submitHandler}
              label="Submit"
              color={formState.formValid ? "#444a5c" : "#888"}
              disabled={!formState.formValid}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  buttonContainer: {
    alignItems: "center",
    margin: 10,
  },
});

export default EditProductScreen;
