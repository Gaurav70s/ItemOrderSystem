import {Ingredient} from './Ingredient';
import {ItemCategory} from "./ItemCategory";

export class Item {
  id: number;
  name: string;
  price: number;
  category: ItemCategory;
  property: string;
  description: string;
  ingredients: Ingredient[];
  itemImageUri: string[];
}
