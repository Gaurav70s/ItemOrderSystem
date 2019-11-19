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
import { SocialLoginModule} from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { KitchenOrderDisplayComponent } from './kitchen-order-display/kitchen-order-display.component';
import { KitchenCompletedOrderComponent } from './kitchen-completed-order/kitchen-completed-order.component';
import { KitchenIncompletedOrderComponent } from './kitchen-incompleted-order/kitchen-incompleted-order.component';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from "./_helpers";
import { CounterDashboardComponent } from './counter-dashboard/counter-dashboard.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateItemCategoryComponent } from './create-item-category/create-item-category.component';
import { CreateItemImagesComponent } from './create-item-images/create-item-images.component';


const config = new AuthServiceConfig([
  { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('85990489032-fu74pc0rnop2oq8rpmatgr1qd77o3k3v.apps.googleusercontent.com') },
  { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('464132267711853') },
  { id: LinkedInLoginProvider.PROVIDER_ID, provider: new LinkedInLoginProvider("78iqy5cu2e1fgr") }
]);

export function provideConfig() {
  return config;
}

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
    CounterDashboardComponent,
    OrdersDashboardComponent,
    CreateItemComponent,
    CreateItemCategoryComponent,
    CreateItemImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: provideConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
