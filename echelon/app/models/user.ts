import mongoose from "mongoose";

export interface User extends mongoose.Document {
    name: string;
    moduleOne: Module;
    moduleTwo: Module;
    moduleThree: Module;
}

export interface Module{
    videoOne: boolean;
    videoTwo: boolean;
    videoThree?: boolean;
    quiz: boolean;
}

const ModuleSchema = new mongoose.Schema({
  videoOne: { type: Boolean, required: true },
  videoTwo: { type: Boolean, required: true },
  videoThree: { type: Boolean }, // Only present in moduleOne
  quiz: { type: Boolean, required: true },
});

const UserProgressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  moduleOne: { type: ModuleSchema, required: true },
  moduleTwo: { type: ModuleSchema, required: true },
  moduleThree: { type: ModuleSchema, required: true },
});

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

export default UserProgress;
