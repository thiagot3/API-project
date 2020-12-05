import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtendimentoComponent } from 'src/app/atendimento/atendimento.component';

const routes: Routes = [
  { path: '', component: AtendimentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
