import { Component } from '@angular/core';

@Component({
  moduleId: module.id,  
  selector: 'cmp-app',
  templateUrl: 'cmp.component.html',
  styleUrls: [ 'cmp.component.css' ]
})

export class CmpComponent {
  title = 'Liste des compétiteurs';
}

