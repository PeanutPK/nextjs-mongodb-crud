// models/Bus.js
import mongoose from "mongoose";
import VehicleSchema from "VehicleSchema.js";


const CarSchema = new mongoose.Schema(VehicleSchema);
CarSchema.size = {
    type: int,
    required: true,
    default: 2,
};


export default mongoose.models.Item || mongoose.model("Car", CarSchema);
