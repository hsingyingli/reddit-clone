
export type PostType = {
  id: number;
  created_at: string;
  owner_id: string;
  content: string;
  is_published: boolean;
  title: string;
  vote: Array<string>;
  image?: string;
}
