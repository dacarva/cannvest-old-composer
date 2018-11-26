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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ProductLot', component: ProductLotComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'LicenseContract', component: LicenseContractComponent },
  { path: 'Producer', component: ProducerComponent },
  { path: 'Consumer', component: ConsumerComponent },
  { path: 'Government', component: GovernmentComponent },
  { path: 'TemperatureSensor', component: TemperatureSensorComponent },
  { path: 'RhSensor', component: RhSensorComponent },
  { path: 'LumenSensor', component: LumenSensorComponent },
  { path: 'MoistureSensor', component: MoistureSensorComponent },
  { path: 'ConsumerLicenseUpdate', component: ConsumerLicenseUpdateComponent },
  { path: 'ProducerLicenseUpdate', component: ProducerLicenseUpdateComponent },
  { path: 'TemperatureReading', component: TemperatureReadingComponent },
  { path: 'RhReading', component: RhReadingComponent },
  { path: 'LumenReading', component: LumenReadingComponent },
  { path: 'MoistureReading', component: MoistureReadingComponent },
  { path: 'IpfsFileReading', component: IpfsFileReadingComponent },
  { path: 'ProcessNoteReading', component: ProcessNoteReadingComponent },
  { path: 'ProductLotReceived', component: ProductLotReceivedComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
