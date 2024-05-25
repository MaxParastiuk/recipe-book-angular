import { NgModule } from '@angular/core';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShopingListComponent } from './shoping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShopingListComponent, ShopingEditComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ShopingListComponent }]),
    FormsModule,
    SharedModule,
  ],
})
export class ShopingListModule {}
