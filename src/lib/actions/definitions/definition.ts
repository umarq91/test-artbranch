interface ItemProps {
  id: number;
  name: string;
  image: string;
  likes: string;
  views: string;
}

type OnClickProps = (name: string) => void;
