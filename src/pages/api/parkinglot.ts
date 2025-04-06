// pages/api/items.js
import dbConnect from "../../../lib/mongodb";
import Item from "../../../models/Item";
import { ParkingLot as ParkingLotModel } from "../../../models/ParkingLotSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	const { method } = req;

	switch (method) {
		// TODO: Implement the GET method for Vehicle
		case "GET":
			try {
				const items = await Item.find({});
				res.status(200).json({ success: true, data: items });
			} catch (error) {
				res.status(400).json({ success: false , error: error});
                console.log(error);
			}
			break;
		// TODO: Implement the POST method for Vehicle
		case "POST":
			try {
				const item = await Item.create(req.body);
				res.status(201).json({ success: true, data: item });
			} catch (error) {
				res.status(400).json({ success: false , error: error});
			}
			break;
		// TODO: Implement the DELETE method for Vehicle
		case "DELETE":
			try {

			} catch (error) {
				res.status(400).json({ success: false , error: error});
			}
		default:
			res.status(400).json({ success: false });
			break;
	}
}
