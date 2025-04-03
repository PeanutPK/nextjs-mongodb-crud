import Level from "./Level";
import Vehicle from "./Vehicle";
import { VehicleSize } from "../lib/vehicleConstant";

export default class ParkingSpot {
	private vehicle: Vehicle | null = null;
	private spotSize: VehicleSize;
	private floorLevel: Level;
	private spotNumber: number;
	private row: number;

	constructor(lvl: Level, row: number, spotNumber: number, size: number) {
		this.floorLevel = lvl;
		this.row = row;
		this.spotNumber = spotNumber;
		this.spotSize = size;
	}

	isAvailable(): boolean {
		return this.vehicle === null;
	}

	canFitVehicle(vehicle: Vehicle): boolean {
		return this.isAvailable() && vehicle.canFitInSpot(this);
	}

	parkVehicle(vehicle: Vehicle): boolean {
		if (this.canFitVehicle(vehicle)) {
			this.vehicle = vehicle;
            vehicle.parkInSpot(this);
			return true;
		}
		return false;
	}

	removeVehicle(): void {
		this.floorLevel.spotFreed();
		this.vehicle = null;
	}

    getVehicle(): Vehicle | null {
        return this.vehicle;
    }

	getRow(): number {
		return this.row;
	}

	getSpotNumber(): number {
		return this.spotNumber;
	}

	getSpotSize(): VehicleSize {
		return this.spotSize;
	}

	print(): void {
		if (this.vehicle === null) {
			if (this.spotSize === VehicleSize.SMALL) {
				console.log("Small Spot");
			}
			if (this.spotSize === VehicleSize.MEDIUM) {
				console.log("Medium Spot");
			}
			if (this.spotSize === VehicleSize.LARGE) {
				console.log("Large Spot");
			}
		} else {
			console.log(this.vehicle.print());
		}
	}
}
