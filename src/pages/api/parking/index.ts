// pages/api/items.js
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import ParkingLotModel, {
	IParkingLot,
} from "../../../../models/ParkingLotSchema";
import ParkingLot from "../../../../models/ParkingLot";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case "GET":
			try {
				let parkingLot: IParkingLot | null = await ParkingLotModel.findOne({});
				if (!parkingLot) {
					parkingLot = await ParkingLot.getInstance().createModel();
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
				const parkingLot = await ParkingLot.getInstance().createModel();
				res.status(201).json({ success: true, data: parkingLot });
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
