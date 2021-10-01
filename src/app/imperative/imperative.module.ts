import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ImperativeComponent } from './imperative.component';

const routes: Route[] = [{ path: '', component: ImperativeComponent }];

@NgModule({
  declarations: [ImperativeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  bootstrap: [ImperativeComponent],
})
export class ImperativeModule {}
