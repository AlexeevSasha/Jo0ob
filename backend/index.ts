import cors from 'cors'
import express from 'express';
import morgan from "morgan";
import {json} from 'body-parser';
import dotenv from 'dotenv'
import 'express-async-errors'
import {connectDB} from "./db/connect";
import authRouter from "./routes/authRouter";
import jobsRouter from "./routes/jobsRouter";
import {notFoundMiddleware} from "./middleware/not-found";
import {errorHandlerMiddleware} from './middleware/error-handler';
import {authMiddleware} from "./middleware/auth";


declare module "express-serve-static-core" {
    interface Request {
        user: {
            userId?: string
        };
    }
}

dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(json());




if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}


app.use('/api/auth', authRouter)
app.use('/api/jobs',authMiddleware, jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)



const start = async () : Promise<void> => {
    try {
        await connectDB(process.env.MONGO_URL ?? '')
        app.listen(PORT,  (): void => {
            console.log('Server running....');
        });
    } catch (error) {
        console.log(error)
    }
}
start()
