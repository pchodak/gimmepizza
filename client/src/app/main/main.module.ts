import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { OrderComponent } from './order/order.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ImageCropperModule,
    ModalModule.forRoot(),
    Ng2GoogleChartsModule
  ],
  declarations: [
    SettingsComponent,
    OrdersListComponent,
    OrderComponent
  ],
  exports: [],
  providers: [BsModalService]
})
export class MainModule { }
