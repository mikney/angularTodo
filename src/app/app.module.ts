import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HomePageComponent} from "./home-page/home-page.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {AuthInterceptor} from "./auth.interceptor";
import {FilterPipe} from "./filter.pipe";
import { MainLayoutComponent } from './main-layout/main-layout.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}


@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    TodoListComponent,
    MainLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {

}
