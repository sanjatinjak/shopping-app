import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Fonts from '../constants/Fonts';

const Input = props => {
  const [touched, setTouched] = useState(false);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={props.value}
        onChangeText={text => {
          props.onChangeHandler(props.label, text);
        }}
        onEndEditing={() => setTouched(!touched)}
      />
      {!props.isInputValid && touched && (
        <Text style={styles.error}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  error: {
    fontFamily: Fonts.lemonLight,
    fontSize: 12,
    color: 'red',
    textTransform: 'capitalize',
  },
});

export default Input;
