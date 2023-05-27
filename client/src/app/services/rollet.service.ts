import { Injectable } from '@angular/core';
import {API} from "../../api";
import {HttpClient} from "@angular/common/http";
import {LightStatuses} from "../enums/light.enum";
import {RolletStatuses} from "../enums/rollet.enum";

@Injectable({
  providedIn: 'root'
})
export class RolletService {

  url = API.local;

  constructor(
    private http: HttpClient
  ) { }

  updateRollet(payload: {
    status?: RolletStatuses
  }) {
    return this.http.post(`${this.url}/rollet`, payload);
  }

  getRollet() {
    return this.http.get(`${this.url}/rollet`);
  }
}
