import {Component, Input} from '@angular/core';
import {IconStorageService} from "../../services/icon-storage.service";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.scss']
})
export class IconDisplayComponent {
  @Input() icon: string | undefined;
  items: {name: string, icon: IconDefinition}[];

  constructor(private iconStorageService: IconStorageService) {
    this.items = iconStorageService.getIcons();
  }
}
