// pages/api/items.js
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import ParkingLotModel, {
	IParkingLot,
} from "../../../../models/ParkingLotSchema";
import ParkingLot from "../../../../models/ParkingLot";
import VehicleFactory from "../../../../models/VehicleFactory";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case "GET":
			try {
				let parkingLot: IParkingLot | null =
					await ParkingLotModel.findOne({});
				if (!parkingLot) {
					console.log("No parking lot found in DB, creating new one");
					// reset then create new parking lot
					ParkingLot.resetInstance();
					const parkingLotData =
						ParkingLot.getInstance().getInstanceData();
					parkingLot = await ParkingLotModel.create(parkingLotData);
					res.status(201).json({ success: true, data: parkingLot });
				} else {
					ParkingLot.getInstance().insertData(parkingLot);
					res.status(200).json({ success: true, data: parkingLot });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
				console.log("Error fetching parking lot:", error);
			}
			break;
		case "POST":
			try {
				const { licensePlate, vehicleType } = req.body;
				if (!licensePlate || !vehicleType) {
					return res.status(400).json({
						success: false,
						message:
							"Please provide license plate and vehicle type",
					});
				}

				const parkingLot = ParkingLot.getInstance();
				const vehicle = VehicleFactory.createVehicle(
					licensePlate,
					vehicleType
				);
				if (!vehicle) {
					return res.status(400).json({
						success: false,
						message: "Invalid vehicle type",
					});
				}
				const parkSuccess: boolean = parkingLot.parkVehicle(vehicle);
				if (parkSuccess) {
					const oldParkingLot = await ParkingLotModel.findOne({});

					let newParkingLot: IParkingLot | null = null;
					if (oldParkingLot) {
						await ParkingLotModel.updateOne(
							{},
							parkingLot.getInstanceData()
						);
						newParkingLot = await ParkingLotModel.findOne({});
					} else {
						newParkingLot = await ParkingLotModel.create(
							parkingLot.getInstanceData()
						);
					}
					res.status(201).json({ success: true, data: newParkingLot });
				} else {
					res.status(400).json({
						success: false,
						message: "Not enough space for this vehicle",
					});
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
				console.log("Error parking vehicle:", error);
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
