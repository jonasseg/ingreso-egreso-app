import { Injectable } from '@angular/core';
import { UserInterface } from '../shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;
  private _user: UserInterface;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly store: Store<AppState>
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
      if (user) {
        this.userSubscription = this.firestore.doc(`${user.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: UserInterface) => {
            this._user = new UserModel(firestoreUser);
            this.store.dispatch(setUser({ user: firestoreUser }));
            this.store.dispatch(unSetItems());
          });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser());
      }
    });
  }

  public get user(): UserInterface {
    return { ...this._user };
  }

  public isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }
}
