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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for Agrotracker-client', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Agrotracker-client', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Agrotracker-client');
    })
  });

  it('network-name should be agrotracker-network@0.0.31',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('agrotracker-network@0.0.31.bna');
    });
  });

  it('navbar-brand should be Agrotracker-client',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('Agrotracker-client');
    });
  });

  
    it('ProductLot component should be loadable',() => {
      page.navigateTo('/ProductLot');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProductLot');
      });
    });

    it('ProductLot table should have 12 columns',() => {
      page.navigateTo('/ProductLot');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('Contract component should be loadable',() => {
      page.navigateTo('/Contract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Contract');
      });
    });

    it('Contract table should have 10 columns',() => {
      page.navigateTo('/Contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('LicenseContract component should be loadable',() => {
      page.navigateTo('/LicenseContract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LicenseContract');
      });
    });

    it('LicenseContract table should have 5 columns',() => {
      page.navigateTo('/LicenseContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Producer component should be loadable',() => {
      page.navigateTo('/Producer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Producer');
      });
    });

    it('Producer table should have 6 columns',() => {
      page.navigateTo('/Producer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Consumer component should be loadable',() => {
      page.navigateTo('/Consumer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Consumer');
      });
    });

    it('Consumer table should have 6 columns',() => {
      page.navigateTo('/Consumer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Government component should be loadable',() => {
      page.navigateTo('/Government');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Government');
      });
    });

    it('Government table should have 4 columns',() => {
      page.navigateTo('/Government');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('TemperatureSensor component should be loadable',() => {
      page.navigateTo('/TemperatureSensor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TemperatureSensor');
      });
    });

    it('TemperatureSensor table should have 2 columns',() => {
      page.navigateTo('/TemperatureSensor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('RhSensor component should be loadable',() => {
      page.navigateTo('/RhSensor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RhSensor');
      });
    });

    it('RhSensor table should have 2 columns',() => {
      page.navigateTo('/RhSensor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('LumenSensor component should be loadable',() => {
      page.navigateTo('/LumenSensor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LumenSensor');
      });
    });

    it('LumenSensor table should have 2 columns',() => {
      page.navigateTo('/LumenSensor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('MoistureSensor component should be loadable',() => {
      page.navigateTo('/MoistureSensor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MoistureSensor');
      });
    });

    it('MoistureSensor table should have 2 columns',() => {
      page.navigateTo('/MoistureSensor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ConsumerLicenseUpdate component should be loadable',() => {
      page.navigateTo('/ConsumerLicenseUpdate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ConsumerLicenseUpdate');
      });
    });
  
    it('ProducerLicenseUpdate component should be loadable',() => {
      page.navigateTo('/ProducerLicenseUpdate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProducerLicenseUpdate');
      });
    });
  
    it('TemperatureReading component should be loadable',() => {
      page.navigateTo('/TemperatureReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TemperatureReading');
      });
    });
  
    it('RhReading component should be loadable',() => {
      page.navigateTo('/RhReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RhReading');
      });
    });
  
    it('LumenReading component should be loadable',() => {
      page.navigateTo('/LumenReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LumenReading');
      });
    });
  
    it('MoistureReading component should be loadable',() => {
      page.navigateTo('/MoistureReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MoistureReading');
      });
    });
  
    it('IpfsFileReading component should be loadable',() => {
      page.navigateTo('/IpfsFileReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('IpfsFileReading');
      });
    });
  
    it('ProcessNoteReading component should be loadable',() => {
      page.navigateTo('/ProcessNoteReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProcessNoteReading');
      });
    });
  
    it('ProductLotReceived component should be loadable',() => {
      page.navigateTo('/ProductLotReceived');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProductLotReceived');
      });
    });
  
    it('SetupDemo component should be loadable',() => {
      page.navigateTo('/SetupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDemo');
      });
    });
  

});