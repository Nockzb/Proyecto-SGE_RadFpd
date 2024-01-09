import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesCentroComponent } from './unidades-centro.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UnidadesCentroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnidadesCentroModule { }
