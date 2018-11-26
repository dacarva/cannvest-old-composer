import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.agrotracker.network{
   export enum ProductType {
      CANNABIS,
      COCA,
      POPPY,
   }
   export enum ProductLotStatus {
      SEEDED,
      HARVESTED,
      DELIVERED,
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Business extends Participant {
      email: string;
      participantId: string;
      address: Address;
   }
   export class Producer extends Business {
      accountBalance: number;
      validLicense: boolean;
   }
   export class Consumer extends Business {
      accountBalance: number;
      validLicense: boolean;
   }
   export class Government extends Business {
   }
   export abstract class IoTDevice extends Participant {
      deviceId: string;
   }
   export class TemperatureSensor extends IoTDevice {
   }
   export class RhSensor extends IoTDevice {
   }
   export class LumenSensor extends IoTDevice {
   }
   export class MoistureSensor extends IoTDevice {
   }
   export abstract class ProductLotTransaction extends Transaction {
      lot: ProductLot;
   }
   export abstract class LicenseUpdateTransaction extends Transaction {
      licenseStatus: boolean;
      licenseContract: LicenseContract;
   }
   export class ConsumerLicenseUpdate extends LicenseUpdateTransaction {
   }
   export class ProducerLicenseUpdate extends LicenseUpdateTransaction {
   }
   export class TemperatureReading extends ProductLotTransaction {
      temperature: number;
   }
   export class RhReading extends ProductLotTransaction {
      humidity: number;
   }
   export class LumenReading extends ProductLotTransaction {
      lumen: number;
   }
   export class MoistureReading extends ProductLotTransaction {
      moisture: number;
   }
   export class IpfsFileReading extends ProductLotTransaction {
      ipfsFile: string;
   }
   export class ProcessNoteReading extends ProductLotTransaction {
      processNote: string;
   }
   export class ProductLotReceived extends ProductLotTransaction {
   }
   export class ProductLot extends Asset {
      lotId: string;
      type: ProductType;
      status: ProductLotStatus;
      unitCount: number;
      temperatureReadings: TemperatureReading[];
      rhReadings: RhReading[];
      lumenReadings: LumenReading[];
      moistureReadings: MoistureReading[];
      ipfsFileReadings: IpfsFileReading[];
      processNoteReadings: ProcessNoteReading[];
      contract: Contract;
   }
   export class Contract extends Asset {
      contractId: string;
      producer: Producer;
      consumer: Consumer;
      arrivalDateTime: Date;
      unitPrice: number;
      minTemperature: number;
      maxTemperature: number;
      minPenaltyFactor: number;
      maxPenaltyFactor: number;
   }
   export class LicenseContract extends Asset {
      contractId: string;
      government: Government;
      producer: Producer;
      consumer: Consumer;
   }
   export class TemperatureThresholdEvent extends Event {
      message: string;
      temperature: number;
      lot: ProductLot;
   }
   export class SetupDemo extends Transaction {
   }
// }
