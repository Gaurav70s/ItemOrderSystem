import {Ingredient} from './Ingredient';

export class Item {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity = 0;
  ingredients: Ingredient[];
}
