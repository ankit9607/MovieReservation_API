import { db } from '../main';
import { DocumentSnapshot } from '@google-cloud/firestore';

export class DBService {

    public static createScreen(screen : any){
        db.collection('screens').doc(screen.name).set(screen)
        .then(()=>{
            return;
        })
        .catch((e)=>console.log(e));
    }

    public static async gerScreenById( screenId : string) {
        const docSnapshot : DocumentSnapshot = await db.collection('screens').doc(screenId).get();
        const screen = docSnapshot.data();
        console.log(screen);

        return screen;
    }

    public static async updateScreen(screenId : string, screen : any){
        db.collection('screens').doc(screen.name).update(screen)
        .then(()=>{
            console.log('Screen Successfylly updated');
        })
        .catch((e)=>console.log(e));
    }

}


