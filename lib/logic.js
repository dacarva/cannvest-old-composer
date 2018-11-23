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
 * A lot has been received by an importer
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
    lot.status = 'ARRIVED';

    // if the lot did not arrive on time the payout is zero
    if (lotReceived.timestamp > contract.arrivalDateTime) {
        payOut = 0;
        console.log('Late lot');
    } else {
        // find the lowest temperature reading
        if (lot.temperatureReadings) {
            // sort the temperatureReadings by centigrade
            lot.temperatureReadings.sort(function (a, b) {
                return (a.centigrade - b.centigrade);
            });
            const lowestReading = lot.temperatureReadings[0];
            const highestReading = lot.temperatureReadings[lot.temperatureReadings.length - 1];
            let penalty = 0;
            console.log('Lowest temp reading: ' + lowestReading.centigrade);
            console.log('Highest temp reading: ' + highestReading.centigrade);

            // does the lowest temperature violate the contract?
            if (lowestReading.centigrade < contract.minTemperature) {
                penalty += (contract.minTemperature - lowestReading.centigrade) * contract.minPenaltyFactor;
                console.log('Min temp penalty: ' + penalty);
            }

            // does the highest temperature violate the contract?
            if (highestReading.centigrade > contract.maxTemperature) {
                penalty += (highestReading.centigrade - contract.maxTemperature) * contract.maxPenaltyFactor;
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
    contract.grower.accountBalance += payOut;
    contract.importer.accountBalance -= payOut;

    console.log('Grower: ' + contract.grower.$identifier + ' new balance: ' + contract.grower.accountBalance);
    console.log('Importer: ' + contract.importer.$identifier + ' new balance: ' + contract.importer.accountBalance);

    // update the grower's balance
    const growerRegistry = await getParticipantRegistry('org.agrotracker.network.Grower');
    await growerRegistry.update(contract.grower);

    // update the importer's balance
    const importerRegistry = await getParticipantRegistry('org.agrotracker.network.Importer');
    await importerRegistry.update(contract.importer);

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

    console.log('Adding temperature ' + temperatureReading.centigrade + ' to lot ' + lot.$identifier);

    if (lot.temperatureReadings) {
        lot.temperatureReadings.push(temperatureReading);
    } else {
        lot.temperatureReadings = [temperatureReading];
    }

    if (temperatureReading.centigrade < contract.minTemperature ||
        temperatureReading.centigrade > contract.maxTemperature) {
        var temperatureEvent = factory.newEvent(NS, 'TemperatureThresholdEvent');
        temperatureEvent.lot = lot;
        temperatureEvent.temperature = temperatureReading.centigrade;
        temperatureEvent.message = 'Temperature threshold violated! Emitting TemperatureEvent for lot: ' + lot.$identifier;
        console.log(temperatureEvent.message);
        emit(temperatureEvent);
    }

    // add the temp reading to the lot
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.update(lot);
}

/**
 * A GPS reading has been received for a lot
 * @param {org.agrotracker.network.GpsReading} gpsReading - the GpsReading transaction
 * @transaction
 */
async function gpsReading(gpsReading) {  // eslint-disable-line no-unused-vars

    var factory = getFactory();
    var NS = 'org.agrotracker.network';
    var lot = gpsReading.lot;
    var PORT_OF_NEW_YORK = '/LAT:40.6840N/LONG:74.0062W';

    var latLong = '/LAT:' + gpsReading.latitude + gpsReading.latitudeDir + '/LONG:' +
        gpsReading.longitude + gpsReading.longitudeDir;

    if (lot.gpsReadings) {
        lot.gpsReadings.push(gpsReading);
    } else {
        lot.gpsReadings = [gpsReading];
    }

    if (latLong === PORT_OF_NEW_YORK) {
        var lotInPortEvent = factory.newEvent(NS, 'ProductLotInPortEvent');
        lotInPortEvent.lot = lot;
        var message = 'ProductLot has reached the destination port of ' + PORT_OF_NEW_YORK;
        lotInPortEvent.message = message;
        console.log(message);
        emit(lotInPortEvent);
    }

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

    // create the grower
    const grower = factory.newResource(NS, 'Grower', 'farmer@email.com');
    const growerAddress = factory.newConcept(NS, 'Address');
    growerAddress.country = 'USA';
    grower.address = growerAddress;
    grower.accountBalance = 0;

    // create the importer
    const importer = factory.newResource(NS, 'Importer', 'supermarket@email.com');
    const importerAddress = factory.newConcept(NS, 'Address');
    importerAddress.country = 'UK';
    importer.address = importerAddress;
    importer.accountBalance = 0;

    // create the shipper
    const shipper = factory.newResource(NS, 'Shipper', 'shipper@email.com');
    const shipperAddress = factory.newConcept(NS, 'Address');
    shipperAddress.country = 'Panama';
    shipper.address = shipperAddress;
    shipper.accountBalance = 0;

    // create the contract
    const contract = factory.newResource(NS, 'Contract', 'CON_001');
    contract.grower = factory.newRelationship(NS, 'Grower', 'farmer@email.com');
    contract.importer = factory.newRelationship(NS, 'Importer', 'supermarket@email.com');
    contract.shipper = factory.newRelationship(NS, 'Shipper', 'shipper@email.com');
    const tomorrow = setupDemo.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.arrivalDateTime = tomorrow; // the lot has to arrive tomorrow
    contract.unitPrice = 0.5; // pay 50 cents per unit
    contract.minTemperature = 2; // min temperature for the cargo
    contract.maxTemperature = 10; // max temperature for the cargo
    contract.minPenaltyFactor = 0.2; // we reduce the price by 20 cents for every degree below the min temp
    contract.maxPenaltyFactor = 0.1; // we reduce the price by 10 cents for every degree above the max temp

    // create the lot
    const lot = factory.newResource(NS, 'ProductLot', 'SHIP_001');
    lot.type = 'BANANAS';
    lot.status = 'IN_TRANSIT';
    lot.unitCount = 5000;
    lot.contract = factory.newRelationship(NS, 'Contract', 'CON_001');

    // add the growers
    const growerRegistry = await getParticipantRegistry(NS + '.Grower');
    await growerRegistry.addAll([grower]);

    // add the importers
    const importerRegistry = await getParticipantRegistry(NS + '.Importer');
    await importerRegistry.addAll([importer]);

    // add the shippers
    const shipperRegistry = await getParticipantRegistry(NS + '.Shipper');
    await shipperRegistry.addAll([shipper]);

    // add the contracts
    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    await contractRegistry.addAll([contract]);

    // add the lots
    const lotRegistry = await getAssetRegistry(NS + '.ProductLot');
    await lotRegistry.addAll([lot]);
}