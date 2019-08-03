import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {APP_BASE_HREF} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {ItemsComponent} from './items/items.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'item', children: [
      { path: '', component: ItemsComponent },
      { path: ':id', component: ItemDetailsComponent }
    ]
  },
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: './' }],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
