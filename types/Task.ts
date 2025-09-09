export interface ITask {
  _id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  category?: string[];
  colour?: string;
  pinned?: boolean;
}
