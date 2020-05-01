import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'API with node + typescript' }));

export default routes;
