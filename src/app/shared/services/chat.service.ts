import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

export interface Message {
  photoURL: string;
  id?: string;
  text: string;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatService: ChatService;
  msg: Message;
  db: AngularFirestore;
  itemDoc: AngularFirestoreDocument;
  msgCollection: AngularFirestoreCollection<Message>;

  constructor(public afs: AngularFirestore, public router: Router) {}
}
