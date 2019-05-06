import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  // saveImage(image) {
  //   return this.http.put('/settings/image', image);
  // }

}
