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

/* global getParticipantRegistry getAssetRegistry getFactory emit */


'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.agrotracker.network.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */

async function setupDemo(setupDemo) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const NS = 'org.agrotracker.network';

    //Create the producer
    const producer = factory.newResource(NS, 'Producer', 'PROD-ABC-01');
    const producerAddress = factory.newConcept(NS, 'Address');
    producer.name = 'CANNABIS COLOMBIA';
    producer.email = 'cannacol@cannacol.com';
    producer.licensed = true;
    producer.accountBalance = 0;
    producerAddress.country = 'COL';
    producer.address = producerAddress;

    //Create the consumer
    const consumer = factory.newResource(NS, 'Consumer', 'CONS-ABC-01');
    const consumerAddress = factory.newConcept(NS, 'Address');
    consumer.name = 'CONSUMIDOR COLOMBIA';
    consumer.email = 'consucol@consucol.com';
    consumer.licensed = true;
    consumer.accountBalance = 0;
    consumerAddress.country = 'COL';
    consumer.address = consumerAddress;

    //Create the government
    const government = factory.newResource(NS, 'Government', 'GOB-ABC-01');
    const governmentAddress = factory.newConcept(NS, 'Address');
    government.name = 'GOBIERNO DE COLOMBIA';
    government.email = 'info@colombia.gov.co';
    government.licensed = true;
    government.accountBalance = 0;
    governmentAddress.country = 'COL';
    government.address = governmentAddress;

    // create the contract
    const contract = factory.newResource(NS, 'Contract', 'CON_001');
    contract.producer = factory.newRelationship(NS, 'Producer', 'PROD-ABC-01');
    contract.consumer = factory.newRelationship(NS, 'Consumer', 'CONS-ABC-01');
    contract.government = factory.newRelationship(NS, 'Government', 'GOB-ABC-01');
    const tomorrow = setupDemo.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.deliveredDateTime = tomorrow; // the lot has to arrive tomorrow
    contract.unitPrice = 0.5; // pay 50 cents per unit
    contract.minTemperature = 2; // min temperature for the cargo
    contract.maxTemperature = 10; // max temperature for the cargo
    contract.minPenaltyFactor = 0.2; // we reduce the price by 20 cents for every degree below the min temp
    contract.maxPenaltyFactor = 0.1; // we reduce the price by 10 cents for every degree above the max temp

    // create the lot
    const lot = factory.newResource(NS, 'PlantLot', 'LOT_001');
    shipment.type = 'CANNABIS';
    shipment.status = 'HARVESTED';
    shipment.unitCount = 5000;
    shipment.contract = factory.newRelationship(NS, 'Contract', 'CON_001');

    // create the Temperature sensor
    const temperatureSensor = factory.newResource(NS, 'TemperatureSensor', 'SENSOR_TEMP001');

    // create the HR sensor
    const hrSensor = factory.newResource(NS, 'RelativeHumiditySensor', 'SENSOR_HR001');
    
    // create the Lux sensor
    const lumenSensor = factory.newResource(NS, 'LumenSensor', 'SENSOR_LUX001');

    // create the Moisture sensor
    const moistureSensor = factory.newResource(NS, 'MoistureSensor', 'SENSOR_MOIST001');

    // add the Producers
    const producerRegistry = await getParticipantRegistry(NS + '.Producer');
    await producerRegistry.addAll([producer]);

    // add the Consumers
    const consumerRegistry = await getParticipantRegistry(NS + '.Consumer');
    await consumerRegistry.addAll([consumer]);

    // add the Government
    const governmentRegistry = await getParticipantRegistry(NS + '.Government');
    await governmentRegistry.addAll([government]);    

    // add the temperature sensor
    const temperatureSensorRegistry = await getParticipantRegistry(NS + '.TemperatureSensor');
    await temperatureSensorRegistry.addAll([temperatureSensor]);

    // add the HR sensor
    const hrSensorRegistry = await getParticipantRegistry(NS + '.RelativeHumiditySensor');
    await hrSensorRegistry.addAll([hrSensor]);

    // add the Lux sensor
    const lumenSensorRegistry = await getParticipantRegistry(NS + '.LumenSensor');
    await lumenSensorRegistry.addAll([lumenSensor]);

    // add the Moisture sensor
    const moistureSensorRegistry = await getParticipantRegistry(NS + '.MoistureSensor');
    await moistureSensorRegistry.addAll([moistureSensor]);
}  











/**
 * Sample transaction
 * @param {org.agrotracker.network.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.agrotracker.network.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.agrotracker.network', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
