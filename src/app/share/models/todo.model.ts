export interface Task{
  name: string;
  status: 'processing' | 'done' | 'pending';
  date: Array<string>; 
}