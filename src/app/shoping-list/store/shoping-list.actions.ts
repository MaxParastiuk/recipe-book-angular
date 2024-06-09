import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shoping List] Add INGREDIENT';
export const ADD_INGREDIENTS = '[Shoping List] Add INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shoping List] Update INGREDIENT';
export const DELETE_INGREDIENT = '[Shoping List] Delete INGREDIENT';
export const START_EDIT = '[Shoping List] Start edit';
export const STOP_EDIT = '[Shoping List] Stop edit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}
export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShopingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
