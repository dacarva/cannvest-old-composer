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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductLotService } from './ProductLot.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-productlot',
  templateUrl: './ProductLot.component.html',
  styleUrls: ['./ProductLot.component.css'],
  providers: [ProductLotService]
})
export class ProductLotComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  lotId = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  unitCount = new FormControl('', Validators.required);
  temperatureReadings = new FormControl('', Validators.required);
  rhReadings = new FormControl('', Validators.required);
  lumenReadings = new FormControl('', Validators.required);
  moistureReadings = new FormControl('', Validators.required);
  ipfsFileReadings = new FormControl('', Validators.required);
  processNoteReadings = new FormControl('', Validators.required);
  contract = new FormControl('', Validators.required);

  constructor(public serviceProductLot: ProductLotService, fb: FormBuilder) {
    this.myForm = fb.group({
      lotId: this.lotId,
      type: this.type,
      status: this.status,
      unitCount: this.unitCount,
      temperatureReadings: this.temperatureReadings,
      rhReadings: this.rhReadings,
      lumenReadings: this.lumenReadings,
      moistureReadings: this.moistureReadings,
      ipfsFileReadings: this.ipfsFileReadings,
      processNoteReadings: this.processNoteReadings,
      contract: this.contract
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProductLot.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.agrotracker.network.ProductLot',
      'lotId': this.lotId.value,
      'type': this.type.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'temperatureReadings': this.temperatureReadings.value,
      'rhReadings': this.rhReadings.value,
      'lumenReadings': this.lumenReadings.value,
      'moistureReadings': this.moistureReadings.value,
      'ipfsFileReadings': this.ipfsFileReadings.value,
      'processNoteReadings': this.processNoteReadings.value,
      'contract': this.contract.value
    };

    this.myForm.setValue({
      'lotId': null,
      'type': null,
      'status': null,
      'unitCount': null,
      'temperatureReadings': null,
      'rhReadings': null,
      'lumenReadings': null,
      'moistureReadings': null,
      'ipfsFileReadings': null,
      'processNoteReadings': null,
      'contract': null
    });

    return this.serviceProductLot.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'lotId': null,
        'type': null,
        'status': null,
        'unitCount': null,
        'temperatureReadings': null,
        'rhReadings': null,
        'lumenReadings': null,
        'moistureReadings': null,
        'ipfsFileReadings': null,
        'processNoteReadings': null,
        'contract': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.agrotracker.network.ProductLot',
      'type': this.type.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'temperatureReadings': this.temperatureReadings.value,
      'rhReadings': this.rhReadings.value,
      'lumenReadings': this.lumenReadings.value,
      'moistureReadings': this.moistureReadings.value,
      'ipfsFileReadings': this.ipfsFileReadings.value,
      'processNoteReadings': this.processNoteReadings.value,
      'contract': this.contract.value
    };

    return this.serviceProductLot.updateAsset(form.get('lotId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProductLot.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProductLot.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'lotId': null,
        'type': null,
        'status': null,
        'unitCount': null,
        'temperatureReadings': null,
        'rhReadings': null,
        'lumenReadings': null,
        'moistureReadings': null,
        'ipfsFileReadings': null,
        'processNoteReadings': null,
        'contract': null
      };

      if (result.lotId) {
        formObject.lotId = result.lotId;
      } else {
        formObject.lotId = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.unitCount) {
        formObject.unitCount = result.unitCount;
      } else {
        formObject.unitCount = null;
      }

      if (result.temperatureReadings) {
        formObject.temperatureReadings = result.temperatureReadings;
      } else {
        formObject.temperatureReadings = null;
      }

      if (result.rhReadings) {
        formObject.rhReadings = result.rhReadings;
      } else {
        formObject.rhReadings = null;
      }

      if (result.lumenReadings) {
        formObject.lumenReadings = result.lumenReadings;
      } else {
        formObject.lumenReadings = null;
      }

      if (result.moistureReadings) {
        formObject.moistureReadings = result.moistureReadings;
      } else {
        formObject.moistureReadings = null;
      }

      if (result.ipfsFileReadings) {
        formObject.ipfsFileReadings = result.ipfsFileReadings;
      } else {
        formObject.ipfsFileReadings = null;
      }

      if (result.processNoteReadings) {
        formObject.processNoteReadings = result.processNoteReadings;
      } else {
        formObject.processNoteReadings = null;
      }

      if (result.contract) {
        formObject.contract = result.contract;
      } else {
        formObject.contract = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'lotId': null,
      'type': null,
      'status': null,
      'unitCount': null,
      'temperatureReadings': null,
      'rhReadings': null,
      'lumenReadings': null,
      'moistureReadings': null,
      'ipfsFileReadings': null,
      'processNoteReadings': null,
      'contract': null
      });
  }

}
