// models/Bus.js
import mongoose from "mongoose";
import VehicleSchema from "VehicleSchema.js";


const BusSchema = new mongoose.Schema(VehicleSchema);
BusSchema.size = {
    type: int,
    required: true,
    default: 3,
};


export default mongoose.models.Item || mongoose.model("Bus", BusSchema);
