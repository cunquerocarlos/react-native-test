import {Product} from '../types/product';

interface ProductDetail extends Product {}

export type NavigatorParamList = {
  Products: undefined;
  ProductDetail: ProductDetail;
  AddProduct: Product | undefined;
};
