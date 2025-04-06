import mongoose, { Schema, Document } from "mongoose";

// Define the Vehicle interface
interface IVehicle {
	licensePlate: string;
	vehicleSize: string; // "SMALL", "MEDIUM", "LARGE"
	vehicleType: string; // "Car", "Motorcycle", etc.
}

// Define the ParkingSpot interface
interface IParkingSpot {
	row: number;
	spotNumber: number;
	vehicleSize: string; // "SMALL", "MEDIUM", "LARGE"
	vehicle: IVehicle | null;
}

// Define the Level interface
interface ILevel {
	level: number;
	availableSpots: number;
	spots: IParkingSpot[];
}

// Define the ParkingLot interface
interface IParkingLot extends Document {
	levels: ILevel[];
}

// Vehicle Schema (Embedded)
const vehicleSchema = new Schema<IVehicle>({
	licensePlate: { type: String, required: true },
	vehicleSize: { type: String, required: true },
	vehicleType: { type: String, required: true },
});

// ParkingSpot Schema (Embedded)
const parkingSpotSchema = new Schema<IParkingSpot>({
	row: { type: Number, required: true },
	spotNumber: { type: Number, required: true },
	vehicleSize: { type: String, required: true },
	vehicle: { type: vehicleSchema, default: null },
});

// Level Schema (Embedded)
const levelSchema = new Schema<ILevel>({
	level: { type: Number, required: true },
	availableSpots: { type: Number, required: true },
	spots: { type: [parkingSpotSchema], required: true },
});

// ParkingLot Schema
const parkingLotSchema = new Schema<IParkingLot>({
	levels: { type: [levelSchema], required: true },
});

// Create the ParkingLot model
const ParkingLot = mongoose.model<IParkingLot>("ParkingLot", parkingLotSchema);

export { ParkingLot };
export type { IParkingLot, ILevel, IParkingSpot, IVehicle };
