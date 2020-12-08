import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ChatService } from '../shared/services/chat.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { User } from '../shared/services/user';

export interface Message {
  email: string;
  id?: string;
  text: {
    msgForm: string;
  };
  date: number;
  photoURL: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public form: FormGroup;
  public users: Observable<User[]>;
  public msgs: Observable<Message[]>;
  public s: string;

  onScroll(e: Event): void {
    let scrollHeight = this.elementRef.nativeElement.querySelector('#chat')
      .scrollHeight;
    let clientHeight = this.elementRef.nativeElement.querySelector('#chat')
      .clientHeight;
    let ccc = this.elementRef.nativeElement.querySelector('#chat').scrollTop;
    if (ccc == scrollHeight - clientHeight) {
      this.elementRef.nativeElement.querySelector('#scroller').style.display =
        'none';
    } else {
      this.elementRef.nativeElement.querySelector('#scroller').style.display =
        'block';
    }
  }

  constructor(
    public fns: AngularFireFunctions,
    public authService: AuthService,
    public chatService: ChatService,
    private db: AngularFirestore,
    public elementRef: ElementRef
  ) {
    this.users = this.db
      .collection<User>('users', (c) =>
        c.where('uid', '==', this.authService.userData.uid)
      )
      .valueChanges();
    this.msgs = this.db
      .collection<Message>('message', (q) => q.orderBy(`date`, 'asc'))
      .valueChanges();
  }

  @ViewChildren('message') messages: QueryList<any>;
  @ViewChild('scrollMe') content: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      let scrollHeight = this.elementRef.nativeElement.querySelector('#chat')
        .scrollHeight;
      this.content.nativeElement.scrollTo({ left: 0, top: scrollHeight });
    } catch (err) {
      console.log(err);
    }
  };

  scroll() {
    let scrollHeight = this.elementRef.nativeElement.querySelector('#chat')
      .scrollHeight;
    const box = this.elementRef.nativeElement.querySelector('#chat');
    box.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      textForm: new FormControl('', Validators.required),
      loginForm: new FormControl(''),
    });
  }

  create() {
    let text = this.form.value;
    let user = this.users;
    const m = {
      email: this.authService.userData.email,
      user: this.authService.userData.uid,
      text: text.textForm,
      date: new Date().getTime(),
      photoURL: this.authService.userData.photoURL,
      displayName: this.authService.userData.displayName,
    };
    this.db
      .collection('message')
      .doc(this.db.createId())
      .set(m)
      .then(() => console.log('post set in db'))
      .catch((error) => console.log(error));
    this.form.reset();
  }
}
