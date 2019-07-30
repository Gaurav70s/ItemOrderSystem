import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'item/:id', component: ItemDetailsComponent},
  {path: 'menu', component: ItemDetailsComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: '/' + (window.location.pathname.split('/')[1] || '') }],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
