import {User} from "./User";

export class Subscriptions{
  subscriptionId: number;
  points: number;
  isNewsletterAllowed: boolean;
  isNotificationAllowed: boolean;
  user: User;
}
