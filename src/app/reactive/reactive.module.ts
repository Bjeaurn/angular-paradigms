import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ReactiveComponent } from './reactive.component';

const routes: Route[] = [{ path: '', component: ReactiveComponent }];

@NgModule({
  declarations: [ReactiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReactiveModule {}
