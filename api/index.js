import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import propertyRouter from './routes/Property.routes.js';
import cors from 'cors';
import path from 'path';
dotenv.config();


mongoose.connect(process.env.MONOGO_DB_URL).then(() => {
  console.log('Connected to MongoDB');
}
).catch((error) => {
  console.log(error);
})

const app = express();
const __dirname = path.resolve();


app.use(express.json());
app.use(cors());
app.use("/api/property", propertyRouter);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'frontend','dist','index.html'))
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
  });
});