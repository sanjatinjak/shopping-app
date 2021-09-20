import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

export default TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

