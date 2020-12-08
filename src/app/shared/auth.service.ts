import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './services/user';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;
  public users: Observable<User[]>;
  public form: FormGroup;
  public w: string;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('users', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('users'));
      } else {
        localStorage.setItem('users', null);
        JSON.parse(localStorage.getItem('users'));
      }
    });
    this.users = this.db.collection<User>('users').valueChanges();
  }

  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      });
  }

  SignUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['login']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('users'));
    return user !== null;
  }
  SetUserData(user) {
    let userRef = this.db.collection('users').doc(`${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: '',
      displayName: {
        editForm: '',
      },
    };
    return userRef.set(userData);
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('users');
      this.router.navigate(['login']);
    });
  }
}
