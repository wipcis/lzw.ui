import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WizardComponent } from './wizard/wizard.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule
  } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
