import { Component } from "@angular/core";
import { ProgressComponent } from "./components/progress/progress.component";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [ProgressComponent],

})
export class AppComponent {
  progress = 70;
  backgrounColor = 'black';
  progressColor = 'blue';
  title = "Research v18";
  // currentTask = 'Research Angular 18';
  label1 = ' @Input() tenBien: KieuDuLieu;';
  label2 = ' <child-component [tenBien]="giaTri"></child-component>';
  label3 = `<child-component (tenSuKien)="hamXuLy($event)">.`;
  currentTask = 'Học Angular 18';
  status = 'Chưa hoàn thành';

  onTaskCompleted(isCompleted: boolean) {
    this.progress = this.progress + 1;
    this.status = isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành';
  }

}

