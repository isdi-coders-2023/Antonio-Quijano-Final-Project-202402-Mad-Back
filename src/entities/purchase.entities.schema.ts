import Joi from 'joi';
import { type PurchaseCreateDto } from './purchase';

export const purchaseCreateDtoSchema = Joi.object<PurchaseCreateDto>({
  userId: Joi.string().required(),
  date: Joi.date().required(),
  isPaid: Joi.boolean().required(),
  totalPrice: Joi.string().required(),
});

export const purchaseUpdateDtoSchema = Joi.object<PurchaseCreateDto>({
  userId: Joi.string().required(),
  date: Joi.date().required(),
  isPaid: Joi.boolean().required(),
  totalPrice: Joi.string().required(),
});
