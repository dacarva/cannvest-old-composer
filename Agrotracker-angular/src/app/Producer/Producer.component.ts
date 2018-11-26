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
import { ProducerService } from './Producer.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-producer',
  templateUrl: './Producer.component.html',
  styleUrls: ['./Producer.component.css'],
  providers: [ProducerService]
})
export class ProducerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  accountBalance = new FormControl('', Validators.required);
  validLicense = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  participantId = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);


  constructor(public serviceProducer: ProducerService, fb: FormBuilder) {
    this.myForm = fb.group({
      accountBalance: this.accountBalance,
      validLicense: this.validLicense,
      email: this.email,
      participantId: this.participantId,
      address: this.address
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProducer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.agrotracker.network.Producer',
      'accountBalance': this.accountBalance.value,
      'validLicense': this.validLicense.value,
      'email': this.email.value,
      'participantId': this.participantId.value,
      'address': this.address.value
    };

    this.myForm.setValue({
      'accountBalance': null,
      'validLicense': null,
      'email': null,
      'participantId': null,
      'address': null
    });

    return this.serviceProducer.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'accountBalance': null,
        'validLicense': null,
        'email': null,
        'participantId': null,
        'address': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.agrotracker.network.Producer',
      'accountBalance': this.accountBalance.value,
      'validLicense': this.validLicense.value,
      'email': this.email.value,
      'address': this.address.value
    };

    return this.serviceProducer.updateParticipant(form.get('participantId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceProducer.deleteParticipant(this.currentId)
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

    return this.serviceProducer.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'accountBalance': null,
        'validLicense': null,
        'email': null,
        'participantId': null,
        'address': null
      };

      if (result.accountBalance) {
        formObject.accountBalance = result.accountBalance;
      } else {
        formObject.accountBalance = null;
      }

      if (result.validLicense) {
        formObject.validLicense = result.validLicense;
      } else {
        formObject.validLicense = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.participantId) {
        formObject.participantId = result.participantId;
      } else {
        formObject.participantId = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
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
      'accountBalance': null,
      'validLicense': null,
      'email': null,
      'participantId': null,
      'address': null
    });
  }
}
