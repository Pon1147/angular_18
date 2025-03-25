import { Component } from '@angular/core';
import { SharedModule } from '../../share/shared.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typInfoLarge, typArrowRightThick } from '@ng-icons/typicons';
@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [SharedModule, NgIcon],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
  viewProviders: [provideIcons({ typInfoLarge, typArrowRightThick })]
})
export class LoginUIComponent {

}
