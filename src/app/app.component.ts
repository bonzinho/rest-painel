import { Component } from '@angular/core';
import * as jQuery from 'jquery';
import { AppHttpService } from './app-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(protected httpService: AppHttpService) { }

  ngOnInit() {
    jQuery("#showMenu").sideNav();
    this.httpService.builder('restaurants')
        .list()
        .then( (res) => { console.log(res); });
  }
}
