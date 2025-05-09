import ParkingSpot from "./ParkingSpot";
import Vehicle from "./Vehicle";
import { VehicleSize } from "../lib/vehicleConstant";

export default class Level {
	private level: number;
	private spots: ParkingSpot[];
	private availableSpots: number = 0;
	private static SPOTS_PER_ROW: number = 10;

	constructor(level: number, numberOfSpots: number) {
		this.level = level;
		this.spots = [];

		const largeSpot: number = numberOfSpots / 4;
		const motorcycleSpot: number = numberOfSpots / 4;
		const compactSpot: number = numberOfSpots - largeSpot - motorcycleSpot;

		for (let i = 0; i < numberOfSpots; i++) {
			let vehicleSize: VehicleSize = VehicleSize.LARGE;
			if (i < motorcycleSpot) {
				vehicleSize = VehicleSize.SMALL;
			} else if (i < motorcycleSpot + compactSpot) {
				vehicleSize = VehicleSize.MEDIUM;
			}
			const row: number = Math.floor(i / Level.SPOTS_PER_ROW);
			this.spots.push(new ParkingSpot(this, row, i, vehicleSize));
		}
		this.availableSpots = numberOfSpots;
	}

	getLevel(): number {
		return this.level;
	}

	getSpots(): ParkingSpot[] {
		return this.spots;
	}

	setSpots(spots: ParkingSpot[]): void {
		this.spots = spots;
		this.availableSpots = spots.length;
		for (const spot of spots) {
			if (spot.getVehicle()) {
				this.availableSpots--;
			}
		}
	}

	getAvailableSpots() {
		return this.availableSpots;
	}

	getSpotByNumber(spotNumber: number): ParkingSpot {
		if (spotNumber < 0 || spotNumber >= this.spots.length) {
			throw new Error("Invalid spot number");
		}
		return this.spots[spotNumber];
	}

	parkVehicle(vehicle: Vehicle): boolean {
		if (this.getAvailableSpots() < vehicle.getSpotNeeded()) return false;
		const spotNumber: number = this.findAvailableSpots(vehicle);
		if (spotNumber < 0) return false;
		return this.parkStartingAtSpot(spotNumber, vehicle);
	}

	removeVehicle(licensePlate: string): boolean {
		for (let i = 0; i < this.spots.length; i++) {
			const spot = this.spots[i];
			const vehicle = spot.getVehicle();

			if (vehicle && vehicle.getLicensePlate() === licensePlate) {
				if (vehicle.getSpotNeeded() > 1) {
					for (let j = 0; j < vehicle.getSpotNeeded(); j++, i++) {
						this.spots[i].removeVehicle();
					}
				} else {
					spot.removeVehicle();
				}

				return true;
			}
		}
		return false;
	}

	parkStartingAtSpot(spotNumber: number, vehicle: Vehicle): boolean {
		this.removeVehicle(vehicle.getLicensePlate());
		vehicle.clearSpot();
		let success: boolean = true;
		for (
			let i = spotNumber;
			i < spotNumber + vehicle.getSpotNeeded();
			i++
		) {
			success = success && this.spots[i].parkVehicle(vehicle);
		}
		this.availableSpots -= vehicle.getSpotNeeded();
		return success;
	}

	findAvailableSpots(vehicle: Vehicle): number {
		let lastRow: number = -1;
		const spotsNeeded: number = vehicle.getSpotNeeded();
		let spotsFound: number = 0;
		for (let i = 0; i < this.spots.length; i++) {
			const spot: ParkingSpot = this.spots[i];
			if (lastRow !== spot.getRow()) {
				spotsFound = 0;
				lastRow = spot.getRow();
			}
			if (spot.canFitVehicle(vehicle)) {
				spotsFound++;
			}
			if (spotsFound === spotsNeeded) {
				return i - (spotsNeeded - 1);
			}
		}
		return -1;
	}

	findVehicle(licensePlate: string): boolean {
		for (let i = 0; i < this.spots.length; i++) {
			const spot = this.spots[i];
			const vehicle = spot.getVehicle();
			if (vehicle?.getLicensePlate() === licensePlate) {
				return true;
			}
		}
		return false;
	}

	print(): void {
		let lastRow: number = -1;
		for (let i = 0; i < this.spots.length; i++) {
			const spot: ParkingSpot = this.spots[i];
			if (spot.getRow() !== lastRow) {
				console.log(" ");
				lastRow = spot.getRow();
			}
			spot.print();
		}
	}

	public spotFreed(): void {
		this.availableSpots++;
	}
}
