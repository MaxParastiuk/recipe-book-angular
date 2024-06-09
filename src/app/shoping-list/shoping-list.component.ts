import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShopingListActions from './store/shoping-list.actions';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private inChangeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shopingList');

    // this.ingredients = this.slService.getIngredients();
    // this.inChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   },
    // );
  }
  ngOnDestroy(): void {
    // this.inChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShopingListActions.StartEdit(index));
    // this.slService.startingEditing.next(index);
  }
}
