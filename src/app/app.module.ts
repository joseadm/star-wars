import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './shared/components/header/header.component';

import { HomeModule } from 'src/app/home/home.module';
import { CharacterDetailsModule } from 'src/app/character-details/character-details.module';
import { MovieDetailsModule } from 'src/app/movie-details/movie-details.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CharacterDetailsModule,
    MovieDetailsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
