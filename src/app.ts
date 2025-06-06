import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.routes'; 
import { OrderRoutes } from './app/modules/orders/order.routes';
import { UserRoutes } from './app/modules/users/user.routes';

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/api/products', ProductRoutes); 
app.use('/api/orders', OrderRoutes); 
app.use('/api/users', UserRoutes);




app.get('/', (_req, res) => {
  res.send('✅ E-commerce API is running');
});

export default app;
