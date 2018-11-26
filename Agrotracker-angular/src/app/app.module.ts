/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ProductLotComponent } from './ProductLot/ProductLot.component';
import { ContractComponent } from './Contract/Contract.component';
import { LicenseContractComponent } from './LicenseContract/LicenseContract.component';

import { ProducerComponent } from './Producer/Producer.component';
import { ConsumerComponent } from './Consumer/Consumer.component';
import { GovernmentComponent } from './Government/Government.component';
import { TemperatureSensorComponent } from './TemperatureSensor/TemperatureSensor.component';
import { RhSensorComponent } from './RhSensor/RhSensor.component';
import { LumenSensorComponent } from './LumenSensor/LumenSensor.component';
import { MoistureSensorComponent } from './MoistureSensor/MoistureSensor.component';

import { ConsumerLicenseUpdateComponent } from './ConsumerLicenseUpdate/ConsumerLicenseUpdate.component';
import { ProducerLicenseUpdateComponent } from './ProducerLicenseUpdate/ProducerLicenseUpdate.component';
import { TemperatureReadingComponent } from './TemperatureReading/TemperatureReading.component';
import { RhReadingComponent } from './RhReading/RhReading.component';
import { LumenReadingComponent } from './LumenReading/LumenReading.component';
import { MoistureReadingComponent } from './MoistureReading/MoistureReading.component';
import { IpfsFileReadingComponent } from './IpfsFileReading/IpfsFileReading.component';
import { ProcessNoteReadingComponent } from './ProcessNoteReading/ProcessNoteReading.component';
import { ProductLotReceivedComponent } from './ProductLotReceived/ProductLotReceived.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductLotComponent,
    ContractComponent,
    LicenseContractComponent,
    ProducerComponent,
    ConsumerComponent,
    GovernmentComponent,
    TemperatureSensorComponent,
    RhSensorComponent,
    LumenSensorComponent,
    MoistureSensorComponent,
    ConsumerLicenseUpdateComponent,
    ProducerLicenseUpdateComponent,
    TemperatureReadingComponent,
    RhReadingComponent,
    LumenReadingComponent,
    MoistureReadingComponent,
    IpfsFileReadingComponent,
    ProcessNoteReadingComponent,
    ProductLotReceivedComponent,
    SetupDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
