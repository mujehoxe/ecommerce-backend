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
