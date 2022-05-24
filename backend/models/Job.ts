import {Schema, model, Types} from 'mongoose';


export interface IJob  {
    company: string;
    position: string;
    status: 'interview' | 'declined' | 'pending';
    type: 'full-time' | 'part-time' | 'remote' | 'internship';
    location: string;
    createBy: Types.ObjectId;
    createdAt: string,
    updatedAt: string,
}

const JobSchema = new Schema<IJob>({
        company: {type: String, required: [true, 'Please provide company'], maxlength: 30},
        position: {type: String, required: [true, 'Please provide position'], maxlength: 30},
        status: {type: String, default: 'pending'},
        type: {type: String, default: 'full-time'},
        location: {type: String, maxlength: 30},
        createBy: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true }
)

JobSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



export default model('Job', JobSchema)