import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextProps as TextProperties,
  Text as TextRN,
  TextStyle,
} from 'react-native';
import colors from '../theme/colors';

interface Props extends TextProperties {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text: FC<Props> = ({children, style: styleOverride, ...props}) => {
  const style = [styles.color, styleOverride];

  return (
    <TextRN style={style} {...props}>
      {children}
    </TextRN>
  );
};

const styles = StyleSheet.create({
  color: {
    color: colors.text,
  },
});

export default Text;
