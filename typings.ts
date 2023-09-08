/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type CategoryCustomizer = CollectionCustomizer<Schema, 'category'>;
export type CategoryRecord = TPartialRow<Schema, 'category'>;
export type CategoryConditionTree = TConditionTree<Schema, 'category'>;
export type CategoryFilter = TPaginatedFilter<Schema, 'category'>;
export type CategorySortClause = TSortClause<Schema, 'category'>;
export type CategoryAggregation = TAggregation<Schema, 'category'>;

export type OrderCustomizer = CollectionCustomizer<Schema, 'order'>;
export type OrderRecord = TPartialRow<Schema, 'order'>;
export type OrderConditionTree = TConditionTree<Schema, 'order'>;
export type OrderFilter = TPaginatedFilter<Schema, 'order'>;
export type OrderSortClause = TSortClause<Schema, 'order'>;
export type OrderAggregation = TAggregation<Schema, 'order'>;

export type OrderOrderedProductsProductCustomizer = CollectionCustomizer<Schema, 'order_ordered_products_product'>;
export type OrderOrderedProductsProductRecord = TPartialRow<Schema, 'order_ordered_products_product'>;
export type OrderOrderedProductsProductConditionTree = TConditionTree<Schema, 'order_ordered_products_product'>;
export type OrderOrderedProductsProductFilter = TPaginatedFilter<Schema, 'order_ordered_products_product'>;
export type OrderOrderedProductsProductSortClause = TSortClause<Schema, 'order_ordered_products_product'>;
export type OrderOrderedProductsProductAggregation = TAggregation<Schema, 'order_ordered_products_product'>;

export type ProductCustomizer = CollectionCustomizer<Schema, 'product'>;
export type ProductRecord = TPartialRow<Schema, 'product'>;
export type ProductConditionTree = TConditionTree<Schema, 'product'>;
export type ProductFilter = TPaginatedFilter<Schema, 'product'>;
export type ProductSortClause = TSortClause<Schema, 'product'>;
export type ProductAggregation = TAggregation<Schema, 'product'>;


export type Schema = {
  'category': {
    plain: {
      'id': number;
      'name': string;
    };
    nested: {};
    flat: {};
  };
  'order': {
    plain: {
      'id': number;
      'firstName': string;
      'lastName': string;
      'state': string;
      'phoneNumber': string;
      'address': string;
    };
    nested: {};
    flat: {};
  };
  'order_ordered_products_product': {
    plain: {
      'orderId': number;
      'productId': number;
    };
    nested: {
      'order': Schema['order']['plain'] & Schema['order']['nested'];
      'product': Schema['product']['plain'] & Schema['product']['nested'];
    };
    flat: {
      'order:id': number;
      'order:firstName': string;
      'order:lastName': string;
      'order:state': string;
      'order:phoneNumber': string;
      'order:address': string;
      'product:id': number;
      'product:name': string;
      'product:description': string;
      'product:price': number;
      'product:percentage': number;
      'product:quantity': number;
      'product:thumbnail': string;
      'product:images': string;
      'product:category_id': number;
      'product:createdAt': string;
      'product:category:id': number;
      'product:category:name': string;
    };
  };
  'product': {
    plain: {
      'id': number;
      'name': string;
      'description': string;
      'price': number;
      'percentage': number;
      'quantity': number;
      'thumbnail': string;
      'images': string;
      'category_id': number;
      'createdAt': string;
    };
    nested: {
      'category': Schema['category']['plain'] & Schema['category']['nested'];
    };
    flat: {
      'category:id': number;
      'category:name': string;
    };
  };
};
