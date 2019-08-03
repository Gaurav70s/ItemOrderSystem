import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BooktableComponent } from './booktable/booktable.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AppMenuComponent } from './app-menu/app-menu.component';

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
    AppMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
