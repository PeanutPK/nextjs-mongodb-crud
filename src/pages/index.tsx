import { useState, useEffect } from "react";
import {
	IParkingLot,
	ILevel,
	IParkingSpot,
	IVehicle,
} from "../../models/ParkingLotSchema";

interface Form {
	licensePlate: string;
	vehicleType: string;
}

export default function Home() {
	const [parkingLot, setParkingLot] = useState<IParkingLot | null>(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<string>("");
	const [form, setForm] = useState<Form>({
		licensePlate: "",
		vehicleType: "",
	});

	const fetchParkingLot = async () => {
		setLoading(true);
		console.log("Fetching parking lot data...");
		try {
			const response = await fetch("/api/parking");
			const data = await response.json();
			if (data.success) {
				setParkingLot(data.data);
			} else {
				console.error("Error fetching parking lot data:", data);
			}
		} catch (error) {
			console.error("Error fetching parking lot data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchParkingLot();
	}, [setParkingLot]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleLeaveSubmit = async (licensePlate: string) => {
		try {
			const res = await fetch(`/api/parking`, {
				// Updated endpoint
				method: "DELETE",
				headers: {
					"Content-Type": "application/json", // If you send data in the body
				},
				body: JSON.stringify({ licensePlate }), // Send license plate in the request body
			});

			const data = await res.json();
			console.log("Response data:", data); // Log the response data for debugging
			if (data.success) {
				setMessage(`Vehicle ${licensePlate} left successfully!`);
				fetchParkingLot();
				setForm({ licensePlate: "", vehicleType: "" });
			} else {
				setMessage(
					data.message || `Failed to remove vehicle ${licensePlate}`
				);
				console.error("Error removing vehicle:", data);
			}
		} catch (error) {
			setMessage("Error removing vehicle. Please try again.");
			console.error("Error removing vehicle:", error);
		}
	};

	const handleParkSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch("/api/parking", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();
			if (data.success) {
				setMessage("Vehicle parked successfully!");
				// update current parking lot and reset form
				fetchParkingLot();
				setForm({ licensePlate: "", vehicleType: "" });
			} else {
				console.error("Error parking vehicle:", data);
			}
		} catch (error) {
			console.error("Error parking vehicle:", error);
			setMessage("Error parking vehicle. Please try again.");
		}
	};

	const spotsTableMap = (spots: IParkingSpot[]) => {
		const MAX_LICENSE_PLATE_LENGTH = 10;
		return spots.map((spot: IParkingSpot, index: number) => {
			const vehicle: IVehicle | null = spot.vehicle;
			let displayLicensePlate = "Available";
			let isAvailable = true;

			if (vehicle) {
				isAvailable = false;
				if (vehicle.licensePlate.length > MAX_LICENSE_PLATE_LENGTH) {
					displayLicensePlate =
						vehicle.licensePlate.substring(
							0,
							MAX_LICENSE_PLATE_LENGTH
						) + "...";
				} else {
					displayLicensePlate = vehicle.licensePlate;
				}
			}

			return (
				<tr key={index}>
					<td>{spot.level}</td>
					<td>{spot.row}</td>
					<td>{spot.spotNumber}</td>
					<td>{spot.vehicleSize}</td>
					<td
						className={`w-10% ${
							isAvailable ? `text-green-400` : ""
						}`}>
						{displayLicensePlate}
					</td>
					<td>
						<button
							type="submit"
							className="leave-button"
							onClick={() =>
								handleLeaveSubmit(displayLicensePlate)
							}
							disabled={isAvailable}>
							Leave
						</button>
					</td>
				</tr>
			);
		});
	};

	const levelsMap = (levels: ILevel[]) => {
		return levels.map((level: ILevel, index: number) => {
			return (
				<div key={index} className="parking-lot">
					<h3>Level {level.level}</h3>
					<table>
						<thead>
							<tr>
								<th>Level</th>
								<th>Row</th>
								<th>Spot Number</th>
								<th>Vehicle Size</th>
								<th>License Plate</th>
								<th>Remove Vehicle</th>
							</tr>
						</thead>
						<tbody>{spotsTableMap(level.spots)}</tbody>
					</table>
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Parking Lot Management</h1>
			{loading ? (
				<p>Loading...</p>
			) : parkingLot ? (
				<div>
					<div className="form-container">
						<form onSubmit={handleParkSubmit}>
							<select
								name="vehicleType"
								value={form.vehicleType}
								onChange={handleChange}
								required>
								<option value="">Select Vehicle Type</option>
								<option value="Car">Car</option>
								<option value="Motorcycle">Motorcycle</option>
								<option value="Bus">Bus</option>
							</select>
							<input
								type="text"
								name="licensePlate"
								value={form.licensePlate}
								onChange={handleChange}
								placeholder="License Plate"
								required
							/>
							<button type="submit" className="park-button">
								Park Vehicle
							</button>
						</form>
					</div>
					{message && <h3>{message}</h3>}
					{levelsMap(parkingLot.levels)}
				</div>
			) : (
				<p>No parking lot data available.</p>
			)}
		</div>
	);
}
