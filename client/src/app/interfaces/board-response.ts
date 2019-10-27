import { CardResponse } from '@app/interfaces/card-response';

export interface BoardResponse {
  author_id: number;
  id: number;
  title: string;
  cards: CardResponse[];
}
