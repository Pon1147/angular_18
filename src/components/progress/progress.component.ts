import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() progress = 50;
  @Input() progressColor = 'tomato';
  @Input() backgroundColor = '#CCC';

  constructor() {
    //
  }
  ngOnInit() {
    // Initialization logic for the component can be added here
    console.log('ProgressComponent initialized with progress:', this.progress);
  }
  ngOnChanges() {
    // Logic to handle changes to input properties can be added here
    console.log('ProgressComponent inputs changed:', {
      progress: this.progress,
      progressColor: this.progressColor,
      backgroundColor: this.backgroundColor
    });
  }
  
  @Input() taskName = '';
  @Output() taskCompleted = new EventEmitter<boolean>();
  isCompleted = false;

  toggleComplete() {
    this.isCompleted = !this.isCompleted;
    this.taskCompleted.emit(this.isCompleted);
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleComplete();
    }
  }
}
