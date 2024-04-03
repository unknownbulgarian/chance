import { Component, OnInit } from "@angular/core";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ParticlesConfig } from "src/app/utils/particles";
import { SettingsService } from "src/app/Services/settings.service";
import { Title } from "@angular/platform-browser";



@Component({
  selector: 'app-profiles',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})

export class NotFoundComponent implements OnInit  {



  constructor(public title : Title, public particlesConfig : ParticlesConfig, public settingsService : SettingsService) { }



  ngOnInit(): void {

    this.title.setTitle('Chance - 404 not found')

    history.pushState({}, '404', 'notfound');
  }



  particlesLoaded(container: Container): void {
  }

  async particlesInit(engine: Engine): Promise<void> {

    await loadSlim(engine);
  }

}