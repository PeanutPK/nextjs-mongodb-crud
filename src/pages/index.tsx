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

	const handleSubmit = async (e: React.FormEvent) => {
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
		return spots.map((spot: IParkingSpot, index: number) => {
			const vehicle: IVehicle | null = spot.vehicle;
			return (
				<tr key={index}>
					<td>{spot.level}</td>
					<td>{spot.row}</td>
					<td>{spot.spotNumber}</td>
					<td>{spot.vehicleSize}</td>
					<td>{vehicle ? vehicle.licensePlate : "Available"}</td>
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
						<form onSubmit={handleSubmit}>
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
							<button type="submit">Park Vehicle</button>
						</form>
					</div>
					{message && <p>{message}</p>}
					{levelsMap(parkingLot.levels)}
				</div>
			) : (
				<p>No parking lot data available.</p>
			)}
		</div>
	);
}
