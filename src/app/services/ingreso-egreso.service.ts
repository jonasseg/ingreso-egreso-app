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

  public crear(ingresoEgreso: IngreoEgresoInterface): Promise<void> {
    const id = this.firestore.createId();
    ingresoEgreso.id = id;
    return this.firestore
      .doc(`${ingresoEgreso.uid}/ingresos-egresos`)
      .collection('items')
      .doc(id)
      .set({...ingresoEgreso});
  }

  public initIngresoEgresoListener(uid: string): Observable<IngreoEgresoInterface[]> {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .valueChanges() as Observable<IngreoEgresoInterface[]>;
  }

  public deleteItem(id: string): Promise<void> {
    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos/items/${id}`).delete();
  }
}
