import { Router } from 'express'
import * as ctrl from '../controllers/park';

const parkRouter: Router = Router();

parkRouter.get('/', ctrl.getParkInfo)
  .delete('/', ctrl.deleteParkingInfo)
  .post('/', ctrl.createParkingInfo);

export default parkRouter;
