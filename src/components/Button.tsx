import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import colors from '../theme/colors';
import {utilFlex, utilSpacing, utilText} from '../theme/util';
import Text from './Text';

interface Props extends TouchableOpacityProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'gray' | 'red';
}

const Button: FC<Props> = ({
  text,
  variant = 'primary',
  style: styleOverride,
  ...rest
}) => {
  const style = [
    styles.button,
    utilFlex.flexCenter,
    utilSpacing.py5,
    stylesBtn[variant],
    styleOverride,
  ];

  return (
    <TouchableOpacity style={style} {...rest}>
      <Text style={[styles.textWhite, stylesText[variant]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 6,
  },
  textWhite: {
    color: colors.white,
  },
  buttonGray: {
    backgroundColor: colors.grayBorder,
  },
  textGray: {
    color: colors.grayText,
  },
  buttonRed: {
    backgroundColor: colors.red,
  },
  buttonYellow: {
    backgroundColor: colors.yellow,
  },
});

const stylesBtn = {
  primary: styles.buttonYellow,
  gray: styles.buttonGray,
  red: styles.buttonRed,
};
const stylesText = {
  primary: utilText.colorText,
  gray: styles.textGray,
  red: styles.textWhite,
};

export default Button;
