import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProblemPage } from './problem.page';
import {MainPipeModule} from '../../mainPipe.module';

const routes: Routes = [
  {
    path: '',
    component: ProblemPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MainPipeModule
    ],
  declarations: [ProblemPage],
})
export class ProblemPageModule {}
