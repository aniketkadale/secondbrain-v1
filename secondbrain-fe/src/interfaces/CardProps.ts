export interface CardProps {
  id: string;
  type: "youtube" | "twitter";
  link: string;
  title: string;
  onDelete?: (id: string) => void
}
