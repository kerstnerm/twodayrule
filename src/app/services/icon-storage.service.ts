import { Injectable } from '@angular/core';
import {
  faBicycle, faClock,
  faHeart, faPen,
  faPersonRunning,
  faPersonSwimming,
  faSchool,
  faShower, faWater
} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class IconStorageService {
  items = [
    {
      name: 'bicycle',
      icon: faBicycle
    },
    {
      name: 'shower',
      icon: faShower
    },
    {
      name: 'heart',
      icon: faHeart
    },
    {
      name: 'run',
      icon: faPersonRunning
    },
    {
      name: 'swim',
      icon: faPersonSwimming
    },
    {
      name: 'learn',
      icon: faSchool
    },
    {
      name: 'sleep',
      icon: faClock
    },
    {
      name: 'water',
      icon: faWater
    },
    {
      name: 'write',
      icon: faPen
    },
  ];
  constructor() { }

  public getIcons() {
    return this.items;
  }
}
