import { Component } from '@angular/core';
import {CharlistComponent} from "./charlist/charlist.component";

// declare var electron: any;
// let remote = require('remote');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Midgard verbessern';
//  fs = (electron != undefined) ? electron.remote.require('fs') : null;
//  fspresent = electron !== undefined;
}