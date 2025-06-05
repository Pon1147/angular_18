// src/app/store/product.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from './product.actions';

export interface ProductState {
  products: string[];
}

export const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(
    loadProductsSuccess,
    (state, { products }): ProductState => ({
      ...state,
      products,
    })
  )
);
