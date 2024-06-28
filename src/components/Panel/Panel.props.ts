export interface PanelProps {
  column?: 1 | 2 | 3;
  height?: "full" | "half";
  children?: React.ReactNode;
  imgSrc: string;
  imgAltText: string;
}
