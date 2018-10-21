import { Request, Response } from "express";
import { TheatreService } from "../service/theatre.service";

export class APIController {


    public static setScreens(req : Request, res : Response) : void {

        TheatreService.setScreen(req.body);

        res.status(200);
        res.json({"message" : "Screen has been saved!"});
    }

    public static reserveTickets(req : Request, res : Response) : void {
        console.log(req.body);
        const screenId : string = req.params.screen_name;
        const seatsToReseve : any = req.body;
        TheatreService.reserveTickets(screenId, seatsToReseve)
        .then(onData=>{
            if(onData === true){
                res.json({"message" : "Seats has been reserved!"});
                res.status(200);
            }
            else{
                res.json({"message" : "Some/All Seats are already Booked by someone else"});
                res.status(500);
            }
        })
        .catch(e=>console.log(e));
    }

    public static getAvailSeatsByScreen(req : Request, res : Response) : void {
        const screenId : string = req.params.screen_name;
        const seatStatus : string = req.query.status;
        if(seatStatus === 'unreserved'){
            TheatreService.getAvailSeatsByScreen(screenId).then(onData=>{
                res.status(200);
                res.json(onData);
            })
            .catch(e=>console.log(e));
        }
        else{
            res.status(500);
            res.json('BAD Request');
        }
    }

    public static getSeatSuggestionByScreen(req : Request, res : Response) : void {
        const screenId : string = req.params.screen_name;
        const numSeats : number = req.query.numSeats;
        const choice : string = req.query.choice;
        const row : string = choice.substring(0, 1);
        const preferedSeat : number = +choice.substring(1, 2);

        TheatreService.getSeatSuggestionByScreen(screenId, numSeats, row, preferedSeat).then(onData=>{
            if(onData!==null) res.json(onData);
            else {res.status(500); res.send('Preferred Seats are not Available');}
        })
        .catch(e=>console.log(e));
    }

    public static seats(req : Request, res : Response) : void {
        if(req.query.numSeats!==undefined)
            APIController.getSeatSuggestionByScreen(req,res);
        else
        APIController.getAvailSeatsByScreen(req,res);
    }



}
