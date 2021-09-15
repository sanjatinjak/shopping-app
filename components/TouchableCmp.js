import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

export default TouchableCmp;
