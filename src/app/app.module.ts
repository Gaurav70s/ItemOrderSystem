import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ItemsComponent} from './items/items.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {BooktableComponent} from './booktable/booktable.component';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {AppMenuComponent} from './app-menu/app-menu.component';
// import { SocialLoginModule} from 'angularx-social-login';
// import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from 'angularx-social-login';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignupComponent} from './signup/signup.component';
import {KitchenOrderDisplayComponent} from './kitchen-order-display/kitchen-order-display.component';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {OrdersDashboardComponent} from './orders-dashboard/orders-dashboard.component';
import {CreateItemComponent} from './create-item/create-item.component';
import {CreateItemCategoryComponent} from './create-item-category/create-item-category.component';
import {CreateItemImagesComponent} from './create-item-images/create-item-images.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {CounterViewComponent} from './counter-view/counter-view.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubscriptionModalComponent} from './subscription-modal/subscription-modal.component';
import {OrderSnackbarComponent} from './order.snackbar/order.snackbar.component';
import {NgbAccordionModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {CookieService} from 'ngx-cookie-service';
import {TableSelectComponent} from './table-select/table-select.component';
import {MatMenuModule} from '@angular/material/menu';
import {PaymentComponent} from './payment/payment.component';
import {MatListModule} from '@angular/material/list';
import {CompletedOrderOnTableComponent} from './completed-order-on-table/completed-order-on-table.component';
import {RejectPopupComponent} from './reject-popup/reject-popup.component';
import {SoftwareRatingComponent} from './software-rating/software-rating.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {BillingDashboardComponent} from './billing-dashboard/billing-dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {KotDisplayComponent} from './kot-display/kot-display.component';
import {AddonModalComponent} from './addon-modal/addon-modal.component';
import {OrderOnTableComponent} from './order-on-table/order-on-table.component';
import {AddOnPopupComponent} from './add-on-popup/add-on-popup.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {NgMaterialMultilevelMenuModule} from 'ng-material-multilevel-menu';


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
    OrdersDashboardComponent,
    CreateItemComponent,
    CreateItemCategoryComponent,
    CreateItemImagesComponent,
    IngredientsComponent,
    CounterViewComponent,
    InvoiceComponent,
    SubscriptionModalComponent,
    OrderSnackbarComponent,
    TableSelectComponent,
    PaymentComponent,
    CompletedOrderOnTableComponent,
    RejectPopupComponent,
    SoftwareRatingComponent,
    BillingDashboardComponent,
    KotDisplayComponent,
    AddonModalComponent,
    OrderOnTableComponent,
    AddOnPopupComponent
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    MatDialogModule,
    NgHttpLoaderModule.forRoot(),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    NgbProgressbarModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    NgMaterialMultilevelMenuModule
  ],
  providers: [
    // { provide: AuthServiceConfig, useFactory: provideConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    // provider used to create fake backend
    CookieService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
