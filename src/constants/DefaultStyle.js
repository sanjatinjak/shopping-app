import Colors from './Colors';
import Fonts from './Fonts';

export default {
  button: {
    width: 120,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontFamily: Fonts.lemonBold,
    fontSize: 12,
    padding: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
