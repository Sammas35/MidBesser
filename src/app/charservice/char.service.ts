import { Injectable } from '@angular/core';
import {Charakter} from "../charakter";
import {CHARS} from "./mock.chars";

@Injectable()
export class CharService {

  constructor() { }

  getChars():Charakter[]{
    return CHARS;
  }
}
