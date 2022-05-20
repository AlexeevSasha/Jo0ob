import {Schema, model} from 'mongoose';
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export interface IUser {
    name: string;
    lastName?: string;
    email: string;
    password: string;
    location?: string;
    createJWT: () => string;
    comparePassword: (str: string) => boolean;
}

const UserSchema = new Schema<IUser>({
    name: {type: String, required: [true, 'Please provide name'], minlength: 3, maxlength: 20, trim: true},
    lastName: {type: String, maxlength: 20, trim: true, default: ''},
    email: {
        type: String, required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {type: String, required: [true, 'Please provide password'], minlength: 5, select: false},
    location: {type: String, maxlength: 20, trim: true, default: ''},
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT =  function () {
    return jwt.sign(
        {userId:this._id},
        process.env.JWT_SECRET as string,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}


export default model('User', UserSchema)