import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-jest-test',
    imports: [SharedModule],
    templateUrl: './jest-test.component.html',
    styleUrls: ['./jest-test.component.scss']
})
export class JestTestComponent {
  type = `submit`;
  disabled = false;
  onClick(){
    console.log(`Value of disabled now: ${this.disabled}`);
    
    this.disabled = !this.disabled
    return this.disabled
  }
}
