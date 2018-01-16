import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Http, HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, HttpModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}