import express from 'express';
import {json} from 'body-parser';
import dotenv from 'dotenv'
import {connectDB} from "./db/connect";
import authRouter from "./routes/authRouter";
import jobsRouter from "./routes/jobsRouter";
import {notFoundMiddleware} from "./middleware/not-found";
import {errorHandlerMiddleware} from './middleware/error-handler'


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/auth', authRouter)
app.use('/api/jobs', jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL ?? '')
        app.listen(PORT, (): void => {
            console.log('Server running....');
        });
    } catch (error) {
        console.log(error)
    }
}
start()
