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

/**
 * A lot has been received by an government
 * @param {org.agrotracker.network.ProductLotReceived} lotReceived - the ProductLotReceived transaction
 * @transaction
 */
async function payOut(lotReceived) {  // eslint-disable-line no-unused-vars

    const contract = lotReceived.lot.contract;
    const lot = lotReceived.lot;
    let payOut = contract.unitPrice * lot.unitCount;

    console.log('Received at: ' + lotReceived.timestamp);
    console.log('Contract arrivalDateTime: ' + contract.arrivalDateTime);

    // set the status of the lot
    lot.status = 'DELIVERED';

    // if the lot did not arrive on time the payout is zero
    if (lotReceived.timestamp > contract.arrivalDateTime) {
        payOut = 0;
        console.log('Late lot');
    } else {
        // find the lowest temperature reading
        if (lot.temperatureReadings) {
            // sort the temperatureReadings by temperature
            lot.temperatureReadings.sort(function (a, b) {
                return (a.temperature - b.temperature);
            });
            const lowestReading = lot.temperatureReadings[0];
            const highestReading = lot.temperatureReadings[lot.temperatureReadings.length - 1];
            let penalty = 0;
            console.log('Lowest temp reading: ' + lowestReading.temperature);
            console.log('Highest temp reading: ' + highestReading.temperature);

            // does the lowest temperature violate the contract?
            if (lowestReading.temperature < contract.minTemperature) {
                penalty += (contract.minTemperature - lowestReading.temperature) * contract.minPenaltyFactor;
                console.log('Min temp penalty: ' + penalty);
            }

            // does the highest temperature violate the contract?
            if (highestReading.temperature > contract.maxTemperature) {
                penalty += (highestReading.temperature - contract.maxTemperature) * contract.maxPenaltyFactor;
                console.log('Max temp penalty: ' + penalty);
            }

            // apply any penalities
            payOut -= (penalty * lot.unitCount);

            if (payOut < 0) {
                payOut = 0;
            }
        }
    }

    console.log('Payout: ' + payOut);
    contract.producer.accountBalance += payOut;
    contract.consumer.accountBalance -= payOut;

    console.log('Producer: ' + contract.producer.$identifier + ' new balance: ' + contract.producer.accountBalance);
    console.log('Government: ' + contract.consumer.$identifier + ' new balance: ' + contract.consumer.accountBalance);

    // update the producer's balance
    const producerRegistry = await getParticipantRegistry('org.agrotracker.network.Producer');
    await producerRegistry.update(contract.producer);

    // update the government's balance
    const governmentRegistry = await getParticipantRegistry('org.agrotracker.network.Government');
    await governmentRegistry.update(contract.consumer);

    // update the state of the lot
    const lotRegistry = await getAssetRegistry('org.agrotracker.network.ProductLot');
    await lotRegistry.update(lot);
}

/**
 * A temperature reading has been received for a lot
 * @param {org.agrotracker.network.TemperatureReading} temperatureReading - the TemperatureReading transaction
 * @transaction
 */
async function temperatureReading(temperatureReading) {  // eslint-disable-line no-unused-vars

    const NS = 'org.agrotracker.network';
    const lot = temperatureReading.lot;
    const contract = lot.contract;
    const factory = getFactory();

    console.log('Adding temperature ' + temperatureReading.temperature + ' to lot ' + lot.$identifier);

    if (lot.temperatureReadings) {
        lot.temperatureReadings.push(temperatureReading);
    } else {
        lot.temperatureReadings = [temperatureReading];
    }

    if (temperatureReading.temperature < contract.minTemperature ||
        temperatureReading.temperature > contract.maxTemperature) {
        var temperatureEvent = factory.newEvent(NS, 'TemperatureThresholdEvent');
        temperatureEvent.lot = lot;
        temperatureEvent.temperature = temperatureReading.temperature;
        temperatureEvent.message = 'Temperature threshold violated! Emitting TemperatureEvent for lot: ' + lot.$identifier;
        console.log(temperatureEvent.message);
        emit(temperatureEvent);
    }

    // add the temp reading to the lot
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.update(lot);
}

/**
 * A rh reading has been received for a lot
 * @param {org.agrotracker.network.RhReading} rhReading - the RhReading transaction
 * @transaction
 */
async function rhReading(rhReading) {  // eslint-disable-line no-unused-vars

    const NS = 'org.agrotracker.network';
    const lot = rhReading.lot;
    const contract = lot.contract;
    const factory = getFactory();

    console.log('Adding rh ' + rhReading.humidity + ' to lot ' + lot.$identifier);

    if (lot.rhReadings) {
        lot.rhReadings.push(rhReading);
    } else {
        lot.rhReadings = [rhReading];
    }

    // add the temp reading to the lot
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.update(lot);
}

/**
 * A lumen reading has been received for a lot
 * @param {org.agrotracker.network.LumenReading} lumenReading - the LumenReading transaction
 * @transaction
 */
async function lumenReading(lumenReading) {  // eslint-disable-line no-unused-vars

    const NS = 'org.agrotracker.network';
    const lot = lumenReading.lot;
    const contract = lot.contract;
    const factory = getFactory();

    console.log('Adding lumen ' + lumenReading.lumen + ' to lot ' + lot.$identifier);

    if (lot.lumenReadings) {
        lot.lumenReadings.push(lumenReading);
    } else {
        lot.lumenReadings = [lumenReading];
    }

    // add the temp reading to the lot
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.update(lot);
}

/**
 * A moisture reading has been received for a lot
 * @param {org.agrotracker.network.MoistureReading} moistureReading - the MoistureReading transaction
 * @transaction
 */
async function moistureReading(moistureReading) {  // eslint-disable-line no-unused-vars

    const NS = 'org.agrotracker.network';
    const lot = moistureReading.lot;
    const contract = lot.contract;
    const factory = getFactory();

    console.log('Adding moisture ' + moistureReading.moisture + ' to lot ' + lot.$identifier);

    if (lot.moistureReadings) {
        lot.moistureReadings.push(moistureReading);
    } else {
        lot.moistureReadings = [moistureReading];
    }

    // add the temp reading to the lot
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.update(lot);
}


/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.agrotracker.network.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
async function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const NS = 'org.agrotracker.network';

    // create the producer
    const producer = factory.newResource(NS, 'Producer', 'PROD-001');
    const producerAddress = factory.newConcept(NS, 'Address');
    producerAddress.country = 'USA';
    producer.address = producerAddress;
    producer.accountBalance = 0;
    producer.email = 'producer@email.com';

    // create the government
    const government = factory.newResource(NS, 'Government', 'GOV-001');
    const governmentAddress = factory.newConcept(NS, 'Address');
    governmentAddress.country = 'UK';
    government.address = governmentAddress;
    government.email = 'government@email.com';
    // government.accountBalance = 0;

    // create the consumer
    const consumer = factory.newResource(NS, 'Consumer', 'CONS-001');
    const consumerAddress = factory.newConcept(NS, 'Address');
    consumerAddress.country = 'Panama';
    consumer.address = consumerAddress;
    consumer.email = 'consumer@email.com';
    consumer.accountBalance = 0;

    // create the contract
    const contract = factory.newResource(NS, 'Contract', 'CON_001');
    contract.producer = factory.newRelationship(NS, 'Producer', 'prducer@email.com');
    // contract.government = factory.newRelationship(NS, 'Government', 'government@email.com');
    contract.consumer = factory.newRelationship(NS, 'Consumer', 'consumer@email.com');
    const tomorrow = setupDemo.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.arrivalDateTime = tomorrow; // the lot has to arrive tomorrow
    contract.unitPrice = 0.5; // pay 50 cents per unit
    contract.minTemperature = 2; // min temperature for the cargo
    contract.maxTemperature = 10; // max temperature for the cargo
    contract.minPenaltyFactor = 0.2; // we reduce the price by 20 cents for every degree below the min temp
    contract.maxPenaltyFactor = 0.1; // we reduce the price by 10 cents for every degree above the max temp

    // create the lot
    const lot = factory.newResource(NS, 'ProductLot', 'LOT_001');
    lot.type = 'CANNABIS';
    lot.status = 'HARVESTED';
    lot.unitCount = 5000;
    lot.contract = factory.newRelationship(NS, 'Contract', 'CON_001');

    // add the producers
    const producerRegistry = await getParticipantRegistry(NS + '.Producer');
    await producerRegistry.addAll([producer]);

    // add the governments
    // const governmentRegistry = await getParticipantRegistry(NS + '.Government');
    // await governmentRegistry.addAll([government]);

    // add the consumers
    const consumerRegistry = await getParticipantRegistry(NS + '.Consumer');
    await consumerRegistry.addAll([consumer]);

    // add the contracts
    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    await contractRegistry.addAll([contract]);

    // add the lots
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.addAll([lot]);
}