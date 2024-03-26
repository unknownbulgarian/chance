import { Injectable } from "@angular/core";
import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import { SettingsService } from "../Services/settings.service";


@Injectable()
export class ParticlesConfig {

    constructor(private settingsService : SettingsService){}

id = "tsparticles";


particlesUrl = "http://foo.bar/particles.json";


particlesOptions = {
    background: {
        color: {
            value: "",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: ClickMode.push,
            },
            onHover: {
                enable: false,
                mode: HoverMode.repulse,
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value:   this.settingsService.isDarkTheme ? '#fff' : 'rgba(65, 35, 184, 1)',
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable:false,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.bounce,
            },
            random: false,
            speed: 0.5,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 200,
            },
            value: 1,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: ['edge']
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
};

}