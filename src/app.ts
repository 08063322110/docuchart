import express from 'express';
import authRoutes from './routes/auth';
import documentRoutes from './routes/documents';
import './events/auth.listeners';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DocuChat server running on port ${PORT}`);
});