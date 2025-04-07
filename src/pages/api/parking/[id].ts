// pages/api/items.js
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import ParkingLotModel from "../../../../models/ParkingLotSchema";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case "POST":
			try {
				const item = await ParkingLotModel.findOne({});
				res.status(201).json({ success: true, data: item });
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
