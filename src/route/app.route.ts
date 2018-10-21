import * as express from 'express';
import { APIController } from '../controller/api.controller';

export class AppRoute{

    private static _router : express.Router = null;

    public static instance() : express.Router {
        if(AppRoute._router === null)
            AppRoute._configRouter();
        return AppRoute._router;
    }

    private static _configRouter(){
        AppRoute._router = express.Router();

        //API 1
        AppRoute._router.post('/screens', APIController.setScreens);
        //API 2
        AppRoute._router.post('/screens/:screen_name/reserve', APIController.reserveTickets);
        //API3 && API4
        AppRoute._router.post('/screens/:screen_name/seats', APIController.seats);
    }
}

