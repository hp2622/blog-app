import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxService } from './blog/shared/service/confirm-box/confirm-box.service';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
  ],
  providers: [ConfirmBoxService],
  bootstrap: [AppComponent],
})
export class AppModule {}
