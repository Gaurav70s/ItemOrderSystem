import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartComponent} from './cart/cart.component';
import {ItemsComponent} from './items/items.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignupComponent} from './signup/signup.component';
import {Role} from './_models/Role';
import {KitchenOrderDisplayComponent} from './kitchen-order-display/kitchen-order-display.component';

import {OrdersDashboardComponent} from './orders-dashboard/orders-dashboard.component';
import {CreateItemComponent} from './create-item/create-item.component';
import {CounterViewComponent} from './counter-view/counter-view.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {CreateItemCategoryComponent} from './create-item-category/create-item-category.component';
import {CreateItemImagesComponent} from './create-item-images/create-item-images.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {AuthGuard} from "./_helpers/auth-guard";
import {TableSelectComponent} from "./table-select/table-select.component";
import {PaymentComponent} from "./payment/payment.component";
import {CompletedOrderOnTableComponent} from "./completed-order-on-table/completed-order-on-table.component";
import {SoftwareRatingComponent} from "./software-rating/software-rating.component";
import {BillingDashboardComponent} from "./billing-dashboard/billing-dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'item' , children: [
      { path: '', component: ItemsComponent },
      { path: 'create', component: CreateItemComponent },
      { path: ':id', component: ItemDetailsComponent }
    ], canActivate:[AuthGuard]
  },
  {path: 'checkout', component: CheckoutComponent ,canActivate:[AuthGuard],data: { roles: [Role.Waiter]}},
  {path: 'cart' , component: CartComponent,canActivate:[AuthGuard], data: { roles: [Role.Waiter]}},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateItemComponent,canActivate:[AuthGuard]},
  {path: 'forgotPassword', component: ForgotPasswordComponent,canActivate:[AuthGuard]},
  {path: 'table_order', component: CompletedOrderOnTableComponent,canActivate:[AuthGuard]},
  {path: 'counterview', component: CounterViewComponent,canActivate:[AuthGuard]},
  {path: 'invoice', component: InvoiceComponent,canActivate:[AuthGuard]},
  {path: 'payment', component: PaymentComponent,canActivate:[AuthGuard]},
  {path: 'table', component: TableSelectComponent,canActivate:[AuthGuard]},
  {path: 'orderlist', component: OrdersDashboardComponent,canActivate:[AuthGuard]},
  {path: 'rating', component: SoftwareRatingComponent, canActivate:[AuthGuard], data: { invoiceid:1}},
  {path: 'bd', component: BillingDashboardComponent},
  {path: 'admin' , children: [
      { path: 'item' , children: [
          { path: 'create', component: CreateItemComponent },
          { path: 'category/create', component: CreateItemCategoryComponent },
          { path: 'image/upload', component: CreateItemImagesComponent }
        ]
      },
      { path: 'ingredient' , children: [
          { path: 'create', component: IngredientsComponent }
        ]
      }
    ],canActivate:[AuthGuard]
  },
  {path: 'signup', component: SignupComponent,canActivate:[AuthGuard]},
  {path: 'kot', component: KitchenOrderDisplayComponent ,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login' }
];

@NgModule({
  providers: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
