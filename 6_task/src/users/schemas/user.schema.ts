import * as mongoose from 'mongoose';
import { UserRole } from '../user-role.enum';

export const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String, enum: [UserRole.USER, UserRole.ADMIN] },
});
