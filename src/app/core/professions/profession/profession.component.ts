import { Profession } from '../profession.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent {
  @Input() profession: Profession;
}
