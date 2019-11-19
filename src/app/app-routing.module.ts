import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartComponent} from './cart/cart.component';
import {ItemsComponent} from './items/items.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from "./_helpers/auth-guard";
import {Role} from "./_models/Role";
import {KitchenCompletedOrderComponent} from "./kitchen-completed-order/kitchen-completed-order.component";
import {KitchenIncompletedOrderComponent} from "./kitchen-incompleted-order/kitchen-incompleted-order.component";
import {KitchenOrderDisplayComponent} from "./kitchen-order-display/kitchen-order-display.component";
import {CounterDashboardComponent} from "./counter-dashboard/counter-dashboard.component";
import {OrdersDashboardComponent} from "./orders-dashboard/orders-dashboard.component";
import {CreateItemComponent} from "./create-item/create-item.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'item' , children: [
      { path: '', component: ItemsComponent },
      { path: ':id', component: ItemDetailsComponent },
      { path: 'create', component: CreateItemComponent }
    ]
  },
  {path: 'checkout', component: CheckoutComponent, data: { roles: [Role.Admin]}},
  {path: 'cart' , component: CartComponent, data: { roles: [Role.Admin]}},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateItemComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'counter', component: CounterDashboardComponent},
  {path: 'orderlist', component: OrdersDashboardComponent},

  {path: 'signup', component: SignupComponent},
  {path: 'kot',component: KitchenOrderDisplayComponent ,children:[
      {path: 'completed', component: KitchenCompletedOrderComponent},
      {path: 'incompleted', component: KitchenIncompletedOrderComponent}
    ]},
  {path: '**', redirectTo: '/login' }
];

@NgModule({
  providers: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
