import { combineReducers } from "redux";

import Product from "./Product";
import Category from "./Category";
import Cart from "./Cart";
import DailyMenuItem from "./DailyMenuItem";
import Order from "./Order";
import OrderItem from "./OrderItem";
import Review from "./Review";
import User from "./User";
import ContactUs from "./ContactUs";
import Booking from "./Booking";
import Admin from "./Admin";

const reducers = combineReducers({
  product: Product,
  category: Category,
  cart: Cart,
  dailyMenuItem: DailyMenuItem,
  order: Order,
  orderItem: OrderItem,
  review: Review,
  user: User,
  admin:Admin,
  booking:Booking,
  contactUs:ContactUs


});

export default reducers;