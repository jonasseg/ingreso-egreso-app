import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private readonly authService: AuthService
  ) { }

  public crear(ingresoEgreso: IngreoEgresoInterface): Promise<DocumentReference> {
    console.log(ingresoEgreso);
    return this.firestore
      .doc(`${ingresoEgreso.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  public initIngresoEgresoListener(uid: string): Observable<IngreoEgresoInterface[]> {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => ({
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          );
        })
      );
  }

  public deleteItem(id: string): Promise<void> {
    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos/items/${id}`).delete();
  }
}
