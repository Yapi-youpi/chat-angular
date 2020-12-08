import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../shared/services/user';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadProgress: Observable<number>;
  public downloadURL: Observable<string>;
  public uploadState: Observable<string>;
  public form: FormGroup;
  public users: Observable<User[]>;

  constructor(
    public authService: AuthService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage
  ) {
    this.users = this.db
      .collection<User>('users', (c) =>
        c.where('uid', '==', this.authService.userData.uid)
      )
      .valueChanges();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      editForm: new FormControl('', Validators.required),
      photoForm: new FormControl('', Validators.required),
    });
  }

  update() {
    let edit = this.form.value;
    const name = this.db.collection('users').doc(this.authService.userData.uid);
    name
      .update({
        displayName: edit.editForm,
      })
      .then((r) => console.log('Update success'))
      .catch((error) => console.log(error));
    this.form.reset();
  }

  async upload(event) {
    const id = this.authService.userData.uid;
    this.ref = this.afStorage.ref('avatars');
    this.task = this.ref.child(id).put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map((s) => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
      .subscribe();
    console.log(this.ref);
  }
}
