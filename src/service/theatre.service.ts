import { DBService } from "./db.service";


export class TheatreService {

    //Question1:
    public static setScreen(screen : any) : void {

        const props : string[] = Object.getOwnPropertyNames(screen.seatInfo);

        for(const i in props){
            screen.seatInfo[props[i]].availableSeats = [];
            for(let j=0;j<screen.seatInfo[props[i]].numberOfSeats;j++){
                screen.seatInfo[props[i]].availableSeats.push(j);
            }
        }

        DBService.createScreen(screen);

    }

    //Question2
    public static async reserveTickets(screenId : string, seatsToReseve : any) {

        const screen : any = await DBService.gerScreenById(screenId);

        if(screen !== undefined){



            const props : string[] = Object.getOwnPropertyNames(seatsToReseve.seats);

            for(const i in props){
                if(screen.seatInfo[props[i]] === undefined) return false;// this Row is not available.
              if(!(TheatreService.checkAvailability(seatsToReseve.seats[props[i]], screen.seatInfo[props[i]].availableSeats))){
                  return false;
              }
            }
           await TheatreService.resevereSeats(screenId, seatsToReseve, screen);

            return true;
        }
        return false;
    }




    //Question3
    public static async getAvailSeatsByScreen(screenId : string) {
        const screen : any = await DBService.gerScreenById(screenId);

        if(screen !== undefined){

            const out : any = {};
            out.seats = {};

            const props : string[] = Object.getOwnPropertyNames(screen.seatInfo);

            for(const i in props){
               out.seats[props[i]]=screen.seatInfo[props[i]].availableSeats;
            }

            return out;
        }
        return {};
    }


    //Question4
    public static async getSeatSuggestionByScreen(screenId:string, numOfSeats:number, row:string, preferedSeat:number){
        const screen : any = await DBService.gerScreenById(screenId);

        if(screen !== undefined){
            return TheatreService.checkPreferredSeats(screen.seatInfo[row].availableSeats, screen.seatInfo[row].aisleSeats, numOfSeats, preferedSeat,row);
        }
        return null;


    }

    //HELPER FUNX  Question2
    private static checkAvailability(setA : number[], setB : number[]) : boolean{
        let isAvail=false;
        for(let i=0;i<setA.length;i++){
            isAvail=false;
            for(let j=0;j<setB.length;j++){
                if(setA[i]===setB[j]){
                    isAvail = true;
                    break;
                }
            }
            if(isAvail === false){
                return false;
            }
        }
        return true;
    }

    //HELPER FUNX Question2
    private static async resevereSeats(screenId : string, seatsToReseve : any, screen : any, ) {

        if(screen !== undefined){

            let props : string[] = Object.getOwnPropertyNames(seatsToReseve.seats);

            for(let i in props){
                screen.seatInfo[props[i]].availableSeats = this.setAMinusB(screen.seatInfo[props[i]].availableSeats, seatsToReseve.seats[props[i]]);
            }

            await DBService.updateScreen(screenId, screen);

            return true;
        }
        return false;
    }

    //HELPER FUNX Question2

    private static setAMinusB(setA : number[], setB : number[]){
        let setC : number[] = [];

        let isMatch=false;
        for(let i=0;i<setA.length;i++){
            isMatch=false;
            for(let j=0;j<setB.length;j++){
                if(setA[i]===setB[j])
                    isMatch=true;
            }
            if(isMatch===false){
                setC.push(setA[i]);
            }
        }

        return setC;
    }


    //Question4
    private static checkPreferredSeats(availableSeats : number[], aisleSeats : number[], numOfSeats : number, preferedSeat : number, row : string){
        console.log(availableSeats);
        console.log(aisleSeats);
        console.log(row);
        console.log(numOfSeats);
        console.log(preferedSeat);

        var temp;
        var counter;
        var ava=availableSeats;
        var aie=aisleSeats;
        var pref=preferedSeat;
        var n=numOfSeats;
        var s;
        var output = new Array();
        //for(int i = pref-(n-1);i>0;i++){
        var i = pref-(n-1);
        for(var j=0;j<n;j++,i++){
            counter=0;
            s="";
            temp=i;
            for(var k=0;k<n;k++,temp++){
                
                if(ava.indexOf(temp)!==-1){
                    if(aie.indexOf(temp)!==-1){
                        counter+=1;
                    }
                    else{
                        counter=0;
                    }
                    if(counter===2){
                        break;
                    }
                    s=s+row+temp+",";
                    if(k===n-1){
                        var z=s.lastIndexOf(",");
                        s=s.substring(0,z) ;
                        output.push(s);
                    }
                }
                else{
                    break;
                }
            }	        
        }
        console.log(output);
        if(output.length>0)
            return output;
        else
            return null;
    }


}