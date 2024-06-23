import express from 'express';
import userRoutes from './routes/users.route';
import roomRoutes from './routes/rooms.route';
import maintenanceRoutes from './routes/maintenance.route';
import dotenv from 'dotenv'
import connectDB from './config/db.config';
import errorHandler from './middlewares/errorHandler';
import notification from './routes/notification.route';


dotenv.config()

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', roomRoutes);
app.use('/api', maintenanceRoutes);
app.use('/api', notification);
app.use(errorHandler);

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})