import React, {FC} from 'react';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputRN,
  TextStyle,
  View,
} from 'react-native';
import colors from '../theme/colors';
import {utilSpacing} from '../theme/util';
import Text from './Text';

interface Props extends TextInputProps, UseControllerProps {
  style?: StyleProp<TextStyle>;
  defaultValue?: string;
  label: string;
}

const TextInput: FC<Props> = ({
  style: styleOverride,
  rules,
  name,
  defaultValue,
  label,
  editable = true,
  ...props
}) => {
  const {field} = useController({name, rules, defaultValue});

  const formContext = useFormContext();

  const {formState} = formContext;
  const hasError = Boolean(formState?.errors[name]);
  const style = [
    utilSpacing.p4,
    styles.input,
    hasError && formState.errors[name]?.message && (styles.borderError as any),
    !editable && styles.backgroundGray,
    styleOverride,
  ];

  return (
    <View style={utilSpacing.p3}>
      <Text style={utilSpacing.mb2}>{label}</Text>
      <TextInputRN
        style={style}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        placeholderTextColor={colors.grayBorder}
        editable={editable}
        {...props}
      />
      <ErrorMessage name={name} />
    </View>
  );
};

const ErrorMessage = (props: {name: string}) => {
  const {name} = props;
  const formContext = useFormContext();

  const {formState} = formContext;

  const hasError = Boolean(formState?.errors[name]);

  if (hasError && formState.errors[name]?.message) {
    return (
      <View style={styles.containerError}>
        <Text style={styles.textError}>
          {formState.errors[name]?.message as string}
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  input: {
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 4,
  },
  containerError: {
    position: 'absolute',
    bottom: -8,
    left: 10,
  },

  textError: {
    color: colors.red,
    fontSize: 12,
  },
  borderError: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  backgroundGray: {
    backgroundColor: colors.grayBorder,
  },
});

export default TextInput;
