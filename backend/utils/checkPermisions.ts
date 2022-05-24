import {UnauthenticatedError} from '../error/index'
import { Types } from 'mongoose';

export const checkPermissions = (reqUser: {userId?: string | undefined}, resourceUserId: Types.ObjectId) => {
    if(reqUser.userId === resourceUserId.toString()) return;
    throw new UnauthenticatedError('Not authorized to access this route')
 }