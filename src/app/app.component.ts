import { Component } from '@angular/core';
import {AudioService} from "./services/audio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lightStatus = 'Turn On';
  rolletStatus = 'CLOSED';

  constructor(
    private audioService: AudioService
  ) {
  }

  toggleLight() {
    this.lightStatus = this.lightStatus === 'Turn On' ? 'Turn Off' : 'Turn On';
    // Implement the communication with your IoT device here
  }

  setRolletStatus(status: string) {
    this.rolletStatus = status;
    // Implement the communication with your IoT device here
  }

  async listenCommands() {
    try {
      const stream = await this.audioService.getMicrophoneStream();
    } catch (error) {
      console.error('Error getting microphone stream:', error);
    }
  }
}
