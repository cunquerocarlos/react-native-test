import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import {NavigatorParamList} from '../navigators/NavigatorParamList';
import axios from '../services/axios';
import colors from '../theme/colors';
import {utilSpacing} from '../theme/util';
import {Product} from '../types/product';
import {convertDate} from '../utils/date';

const AddProductScreen: FC<
  StackScreenProps<NavigatorParamList, 'AddProduct'>
> = ({navigation}) => {
  const {...methods} = useForm<Product>({mode: 'all'});

  const validateDate = (value: string) => {
    if (!value) {
      return 'La fecha es requerida';
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return 'La fecha debe estar en el formato DD/MM/YYYY';
    }

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setMilliseconds(0);
    const parts = value.split('/');
    const inputDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
    inputDate.setHours(0);
    inputDate.setMinutes(0);
    inputDate.setMilliseconds(0);

    if (inputDate < today) {
      return 'La fecha debe ser mayor o igual a la fecha actual';
    }

    const reviewDate = new Date(inputDate);

    const month = (reviewDate.getMonth() + 1).toFixed().padStart(2, '0');
    const date = reviewDate.getDate().toFixed().padStart(2, '0');
    const year = reviewDate.getFullYear() + 1;

    const reviewFormatted = date + '/' + month + '/' + year;
    methods.setValue('reviewDate', reviewFormatted);

    return true;
  };

  const handleReset = () => {
    methods.reset();
  };

  const onSubmit = (data: Product) => {
    console.log(data);

    let productFormatted = {
      ...data,
      date_release: convertDate(data.releaseDate, 'YYYY-MM-DD'),
      date_revision: convertDate(data.reviewDate, 'YYYY-MM-DD'),
    };
    axios
      .post('/bp/products', productFormatted)
      .then(response => {
        Alert.alert('Product added', response?.data?.message);
        methods.reset();
        navigation.goBack();
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        Alert.alert(
          'Error',
          error.message || 'Lo sentimos, se ha logrado agregar el producto',
        );
      });
  };

  const onError = (data: any) => {
    console.log('ERROR', data);
  };

  return (
    <Screen>
      <ScrollView style={[utilSpacing.p3, utilSpacing.mb5]}>
        <Text style={[styles.title, utilSpacing.py3, utilSpacing.ml3]}>
          Formulario de registro
        </Text>
        <FormProvider {...methods}>
          <TextInput
            label="ID"
            name="id"
            rules={{
              required: 'El ID es requerido',
              minLength: {
                message: 'Debe ingresar mínimo 3 caracteres',
                value: 3,
              },
              maxLength: {
                message: 'Debe ingresar máximo 10 caracteres',
                value: 10,
              },
            }}
          />
          <TextInput
            label="Name"
            name="name"
            rules={{
              required: 'El nombre es requerido',
              minLength: {
                message: 'Debe ingresar mínimo 5 caracteres',
                value: 5,
              },
              maxLength: {
                message: 'Debe ingresar máximo 100 caracteres',
                value: 100,
              },
            }}
          />

          <TextInput
            label="Descripción"
            name="description"
            rules={{
              required: 'La descripción es requerida',
              minLength: {
                message: 'Debe ingresar mínimo 10 caracteres',
                value: 10,
              },
              maxLength: {
                message: 'Debe ingresar máximo 200 caracteres',
                value: 200,
              },
            }}
          />

          <TextInput
            label="Logo"
            name="logo"
            rules={{
              required: 'El logo es requerido',
            }}
          />

          <TextInput
            label="Fecha liberación"
            name="releaseDate"
            rules={{validate: validateDate}}
            placeholder="DD/MM/YYYY"
          />

          <TextInput
            label="Fecha revisión"
            name="reviewDate"
            placeholder="DD/MM/YYYY"
            editable={false}
          />

          <View style={[utilSpacing.p3, utilSpacing.my5]}>
            <Button
              text="Enviar"
              style={utilSpacing.mb4}
              onPress={methods.handleSubmit(onSubmit, onError)}
            />
            <Button text="Reiniciar" variant="gray" onPress={handleReset} />
          </View>
        </FormProvider>
      </ScrollView>
    </Screen>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: colors.text,
    fontWeight: 'bold',
  },
});
