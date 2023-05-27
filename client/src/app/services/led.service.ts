import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../../api";
import {LightStatuses} from "../enums/light.enum";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LedService {
  url = API.local;

  constructor(
    private http: HttpClient
  ) { }

  updateLED(payload: {
    status?: LightStatuses
  }) {
    return this.http.post(`${this.url}/led`, payload);
  }

  getLED(): Observable<LightStatuses> {
    return this.http.get<LightStatuses>(`${this.url}/led`);
  }
}
