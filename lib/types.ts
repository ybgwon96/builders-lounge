export interface Project {
  id: string;
  name: string;
  builder_name: string;
  description: string;
  thread_url: string;
  threads_id?: string;
  image_url?: string;
  floor: number;
  unit: number;
  created_at: string;
}
