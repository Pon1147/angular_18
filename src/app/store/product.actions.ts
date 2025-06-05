// src/app/store/product.actions.ts

import { createAction, props } from '@ngrx/store';

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: string[] }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: string }>()
);
