import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BooktableComponent } from './booktable/booktable.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
// import { SocialLoginModule} from 'angularx-social-login';
// import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from 'angularx-social-login';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { KitchenOrderDisplayComponent } from './kitchen-order-display/kitchen-order-display.component';
import { KitchenCompletedOrderComponent } from './kitchen-completed-order/kitchen-completed-order.component';
import { KitchenIncompletedOrderComponent } from './kitchen-incompleted-order/kitchen-incompleted-order.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateItemCategoryComponent } from './create-item-category/create-item-category.component';
import { CreateItemImagesComponent } from './create-item-images/create-item-images.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CounterViewComponent } from './counter-view/counter-view.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscriptionModalComponent } from './subscription-modal/subscription-modal.component';
import { OrderSnackbarComponent} from './order.snackbar/order.snackbar.component';
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { NgHttpLoaderModule } from 'ng-http-loader';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {CookieService} from "ngx-cookie-service";
import { TableSelectComponent } from './table-select/table-select.component';



/*const config = new AuthServiceConfig([
  // tslint:disable-next-line:max-line-length
  { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('85990489032-fu74pc0rnop2oq8rpmatgr1qd77o3k3v.apps.googleusercontent.com') },
  { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('464132267711853') }/!*,
  { id: LinkedInLoginProvider.PROVIDER_ID, provider: new LinkedInLoginProvider('78iqy5cu2e1fgr') }*!/
]);

export function provideConfig() {
  return config;
}*/

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailsComponent,
    CheckoutComponent,
    FooterComponent,
    HeaderComponent,
    BooktableComponent,
    CartComponent,
    LoginComponent,
    AppMenuComponent,
    ForgotPasswordComponent,
    SignupComponent,
    KitchenOrderDisplayComponent,
    KitchenCompletedOrderComponent,
    KitchenIncompletedOrderComponent,
    OrdersDashboardComponent,
    CreateItemComponent,
    CreateItemCategoryComponent,
    CreateItemImagesComponent,
    IngredientsComponent,
    CounterViewComponent,
    InvoiceComponent,
    SubscriptionModalComponent,
    OrderSnackbarComponent,
    TableSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // SocialLoginModule,
    ReactiveFormsModule,
    PDFExportModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    MatDialogModule,
    NgHttpLoaderModule.forRoot(),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    //{ provide: AuthServiceConfig, useFactory: provideConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
