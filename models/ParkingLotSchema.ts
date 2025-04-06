import mongoose, { Schema, Document } from "mongoose";
import { VehicleSize } from "../lib/vehicleConstant";

// Vehicle interface
interface IVehicle {
	licensePlate: string;
	vehicleSize: string; // "SMALL", "MEDIUM", "LARGE"
	vehicleType: string; // "Car", "Motorcycle", etc.
	spotNeeded: number; // only 1 for small and medium, 5 for large
}

// ParkingSpot interface
interface IParkingSpot {
	level: number;
	row: number;
	spotNumber: number;
	vehicleSize: string; // "SMALL", "MEDIUM", "LARGE"
	vehicle: IVehicle | null;
}

// Level interface
interface ILevel {
	level: number;
	availableSpots: number;
	spots: IParkingSpot[];
}

// ParkingLot interface
interface IParkingLot extends Document {
	levels: ILevel[];
}

// Vehicle Schema
const vehicleSchema = new Schema<IVehicle>({
	licensePlate: { type: String, required: true },
	vehicleSize: { type: String, required: true, enum: [VehicleSize.SMALL, VehicleSize.MEDIUM, VehicleSize.LARGE] },
	vehicleType: { type: String, required: true, enum: ["Car", "Motorcycle", "Bus"] },
	spotNeeded: { type: Number, required: true },
});

// ParkingSpot Schema
const parkingSpotSchema = new Schema<IParkingSpot>({
	level: { type: Number, required: true },
	row: { type: Number, required: true },
	spotNumber: { type: Number, required: true },
	vehicleSize: { type: String, required: true },
	vehicle: { type: vehicleSchema, default: null },
});

// Level Schema
const levelSchema = new Schema<ILevel>({
	level: { type: Number, required: true },
	availableSpots: { type: Number, required: true },
	spots: { type: [parkingSpotSchema], required: true },
});

// ParkingLot Schema
const parkingLotSchema = new Schema<IParkingLot>({
	levels: { type: [levelSchema], required: true },
});

// ParkingLot model
export default mongoose.model<IParkingLot>("ParkingLotModel", parkingLotSchema);
export type { IVehicle, IParkingSpot, ILevel, IParkingLot };