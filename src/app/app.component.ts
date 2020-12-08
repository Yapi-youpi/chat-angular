import {ChangeDetectionStrategy, Component, OnDestroy, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  title = 'layouts';
  listener;


  constructor(private renderer2: Renderer2) {
  }

  ngOnDestroy(): void {
    this.listener();
  }

}
