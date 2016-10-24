import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  moduleId: module.id,  
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

export class CmpComponent {
  title = 'Liste des compétiteurs';
  constructor(private auth: AuthService) {}
}

