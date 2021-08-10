import {Ingredient} from './Ingredient';
import {ItemCategory} from './ItemCategory';
import {ItemAddOn} from './ItemAddOn';

export class Item {
  id: number;
  name: string;
  price: number;
  category: ItemCategory;
  property: string;
  description: string;
  ingredients: Ingredient[];
  itemImageUri: string[];
  addonsPrice : number;
  addons: ItemAddOn[];
}
