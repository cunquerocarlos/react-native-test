import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Screen from '../components/Screen';
import Text from '../components/Text';
import {NavigatorParamList} from '../navigators/NavigatorParamList';
import axios from '../services/axios';
import colors from '../theme/colors';
import {utilFlex, utilSpacing, utilText} from '../theme/util';

interface RowProps {
  label: string;
  value?: string;
}
const Row = ({label, value}: RowProps) => {
  return (
    <View style={[utilFlex.flexRow, utilSpacing.py2, utilSpacing.px3]}>
      <Text style={[styles.label, utilFlex.flex1]}>{label}</Text>
      {value && <Text style={[utilText.bold]}>{value}</Text>}
    </View>
  );
};

const ProductDetailScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'ProductDetail'>
> = ({navigation, route: {params}}) => {
  const {id, name, description, releaseDate, reviewDate, logo} = params;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    navigation.navigate('AddProduct', params);
  };

  const handleDelete = () => {
    axios
      .delete('/bp/products/' + params.id)
      .then(response => {
        Alert.alert('Product deleted', response?.data?.message);

        navigation.navigate('Products');
      })
      .catch(error => {
        Alert.alert(
          'Error',
          error.message || 'Lo sentimos, se ha logrado eliminar el producto',
        );
      });
  };

  return (
    <Screen>
      <View style={[utilFlex.flex1, utilSpacing.p5]}>
        <View style={[utilFlex.flex1]}>
          <Text style={styles.title}>ID: {id}</Text>
          <Text style={utilSpacing.pb8}>Información extra</Text>

          <Row label="Nombre" value={name} />
          <Row label="Descripción" value={description} />
          <Row label="Logo" />
          <Image
            source={{uri: logo}}
            alt={name}
            style={[styles.logo, utilFlex.selfCenter]}
          />
          <Row label="Fecha liberación" value={releaseDate} />
          <Row label="Fecha revisión" value={reviewDate} />
        </View>

        <Button
          text="Editar"
          variant="gray"
          style={utilSpacing.mb4}
          onPress={handleEdit}
        />
        <Button text="Eliminar" onPress={() => setConfirmDelete(true)} />
      </View>

      <Modal
        title={`¿Esta seguro que desea eliminar el producto ${params.name}?`}
        visible={confirmDelete}
        onOk={handleDelete}
        onClose={() => setConfirmDelete(false)}
      />
    </Screen>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: colors.text,
    fontWeight: 'bold',
  },
  label: {
    color: colors.grayText,
  },
  logo: {
    width: 300,
    height: 200,
  },
});
