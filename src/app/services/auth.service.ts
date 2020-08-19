import { Injectable } from '@angular/core';
import { UserInterface } from '../shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) { }

  public async crearUsuario(usr: UserInterface): Promise<void> {
    const { user } = await this.auth.createUserWithEmailAndPassword(usr.correo, usr.password);
    usr.uid = user.uid;
    const fUser = new UserModel(usr);
    return this.firestore.doc(`${fUser.uid}/usuario`).set(Object.assign({}, fUser));
  }

  public login(user: UserInterface): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(user.correo, user.password);
  }

  public logout(): Promise<void> {
    return this.auth.signOut();
  }

  public initAuthListener(): void {
    this.auth.authState.subscribe(user => {
      console.log(user);
    });
  }

  public isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }
}
