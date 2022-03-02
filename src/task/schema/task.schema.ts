import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    pathImage: { type: String, required: true },
    nameImage: { type: String, required: true },
    md5File: { type: String, required: true },
  },
  { timestamps: true },
);
