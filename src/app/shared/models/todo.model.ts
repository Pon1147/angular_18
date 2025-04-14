export interface Task{
  id: number;
  name: string;
  status: 'processing' | 'done' | 'pending';
  date: string[]; 
}