import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymansController from './app/controllers/DeliverymansController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import PendingDeliveriesController from './app/controllers/PendingDeliveriesController';
import CompletedDeliveriesController from './app/controllers/CompletedDeliveriesController';
import CollectController from './app/controllers/CollectController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import ProblemsController from './app/controllers/ProblemsController';
import ProblemsDeliveryController from './app/controllers/ProblemsDeliveryController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/pending', PendingDeliveriesController.index);
routes.get('/deliveryman/:id/completed', CompletedDeliveriesController.index);

routes.put('/deliveryman/:deliveryman_id/collect', CollectController.update);
routes.put('/deliveryman/:deliveryman_id/finish', upload.single('file'), FinishDeliveryController.update);

routes.get('/delivery/:delivery_id/problems', ProblemsDeliveryController.index);
routes.post('/delivery/:delivery_id/problems', ProblemsDeliveryController.store);

// Middlware global somente para as rotas que estão abaixo desta linha
routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymans', DeliverymansController.index);
routes.post('/deliverymans', DeliverymansController.store);
routes.put('/deliverymans/:id', DeliverymansController.update);
routes.delete('/deliverymans/:id', DeliverymansController.delete);

routes.get('/deliveries', OrderController.index);
routes.post('/deliveries', OrderController.store);
routes.put('/deliveries/:id', OrderController.update);
routes.delete('/deliveries/:id', OrderController.delete);

routes.get('/problems', ProblemsController.index);

routes.delete('/problem/:problem_id/cancel-delivery', CancelDeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
