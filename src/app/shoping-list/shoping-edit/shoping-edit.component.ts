import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription, iif } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShopingListActions from '../store/shoping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  editMode = false;
  subsctiption: Subscription;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subsctiption = this.store
      .select('shopingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          if (this.slForm) {
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount,
            });
          }
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShopingListActions.UpdateIngredient(newIngredient),
      );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShopingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShopingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShopingListActions.DeleteIngredient());
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subsctiption.unsubscribe();
    this.store.dispatch(new ShopingListActions.StopEdit());
  }
}
