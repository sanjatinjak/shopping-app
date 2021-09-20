import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color='white'
    />
  );
};

export default CustomHeaderButton;
