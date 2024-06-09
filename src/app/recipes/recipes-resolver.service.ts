import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
// import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverSerive implements Resolve<Recipe[]> {
  constructor(
    // private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private recipeService: RecipeService,
    private actions$: Actions,
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // return this.dataStorageService.fetchRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      }),
    );
  }
}
