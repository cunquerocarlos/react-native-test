import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../theme/colors';
import {utilFlex, utilSpacing} from '../theme/util';

import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import Screen from '../components/Screen';
import Text from '../components/Text';
import {NavigatorParamList} from '../navigators/NavigatorParamList';
import axios from '../services/axios';
import {Product} from '../types/product';
import {convertDate} from '../utils/date';

interface PropsItemProduct {
  name: string;
  id: string;
  isLastItem: boolean;
  onPress: () => void;
}
function ItemProduct({name, id, isLastItem, onPress}: PropsItemProduct) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[utilSpacing.p4, !isLastItem && styles.borderBottom]}>
      <View style={utilFlex.flexRow}>
        <View style={utilFlex.flex1}>
          <Text>{name}</Text>
          <Text style={[styles.subtitleItem, utilSpacing.mt1]}>ID: {id}</Text>
        </View>
        <Icon name="chevron-right" size={30} color={colors.grayBorder} />
      </View>
    </TouchableOpacity>
  );
}

const ProductsScreen: FC<StackScreenProps<NavigatorParamList, 'Products'>> = ({
  navigation,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/bp/products');

      let productsFormatted: Product[] =
        response.data?.data?.map(
          (
            product: Partial<Product> & {
              date_revision: string;
              date_release: string;
            },
          ) => ({
            ...product,
            reviewDate: convertDate(product.date_revision, 'DD/MM/YYYY'),
            releaseDate: convertDate(product.date_release, 'DD/MM/YYYY'),
          }),
        ) || [];

      setProducts(productsFormatted);
    } catch (err) {
      Alert.alert('Error', 'Oops... no se pueden mostrar los productos');
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const handlePressItem = (item: any) => {
    navigation.navigate('ProductDetail', item);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredProducts(products || []);
    } else {
      const lowercasedFilter = text.toLowerCase();
      const filteredData = products?.filter(
        ({name, id}) =>
          name.toLowerCase().includes(lowercasedFilter) ||
          id.toLowerCase().includes(lowercasedFilter),
      );
      setFilteredProducts(filteredData || []);
    }
  };

  const handleAdd = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <Screen>
      <ScrollView>
        <View style={[utilSpacing.p5, utilSpacing.mt6]}>
          <TextInput
            placeholder="Search..."
            style={[utilSpacing.p4, styles.inputSearch]}
            placeholderTextColor={colors.grayText}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <View style={[utilSpacing.m5, styles.productList, utilFlex.flex1]}>
          {filteredProducts.map((product, index) => (
            <ItemProduct
              key={product.id}
              name={product.name}
              id={product.id}
              isLastItem={index === products.length - 1}
              onPress={() => handlePressItem(product)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={[utilSpacing.p5, utilSpacing.mb4]}>
        <Button text="Agregar" onPress={() => handleAdd()} />
      </View>
    </Screen>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  subtitleItem: {
    color: colors.grayText,
  },
  productList: {
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 8,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputSearch: {
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 4,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorder,
  },
});
