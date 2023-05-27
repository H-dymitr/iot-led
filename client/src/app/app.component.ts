import {Component, OnInit} from '@angular/core';
import {AudioService} from "./services/audio.service";
import {LedService} from "./services/led.service";
import {FormControl} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {LightStatuses} from "./enums/light.enum";
import {RolletStatuses} from "./enums/rollet.enum";
import {RolletService} from "./services/rollet.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lightStatus!: LightStatuses;
  lightStatuses = LightStatuses;
  lightLoading = true;

  rolletStatus!: RolletStatuses;
  rolletStatuses = RolletStatuses;
  rolletLoading = false;

  constructor(
    private audioService: AudioService,
    private ledService: LedService,
    private rolletService: RolletService
  ) {
  }

  ngOnInit() {
    this.getLightStatus();
    this.getRolletStatus();
  }

  getLightStatus() {
    this.lightLoading = true;
    this.ledService.getLED().subscribe((status: any) => {
      this.lightStatus = status.status;
      // this.colorCtr.setValue(status.color);
      this.lightLoading = false;
    });
  }

  getRolletStatus() {
    this.rolletLoading = true;
    this.rolletService.getRollet().subscribe((status: any) => {
      this.rolletStatus = status.status;
      this.rolletLoading = false;
    });
  }

  toggleLight(value: LightStatuses) {
    this.lightLoading = true;
    this.ledService.updateLED({
      status: this.lightStatus === LightStatuses.ON ? LightStatuses.OFF : LightStatuses.ON
    }).subscribe({
      next: (res: any) => {
        this.lightStatus = res.status;
        this.lightLoading = false;
      },
      error: () => this.lightLoading = false
    });
  }

  toggleRollet(value: RolletStatuses) {
    this.rolletLoading = true;
    this.rolletService.updateRollet({
      status: this.rolletStatus === RolletStatuses.OPEN ? RolletStatuses.CLOSED : RolletStatuses.OPEN
    }).subscribe({
      next: (res: any) => {
        this.rolletStatus = res.status;
        this.rolletLoading = false;
      },
      error: () => this.rolletLoading = false
    });
  }

  async listenCommands() {
    try {
      const stream = await this.audioService.getMicrophoneStream();
    } catch (error) {
      console.error('Error getting microphone stream:', error);
    }
  }
}
