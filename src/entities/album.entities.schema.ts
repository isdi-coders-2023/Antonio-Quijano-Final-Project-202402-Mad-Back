import Joi from 'joi';
import { type AlbumCreateDto } from './album';

export const albumCreateDtoSchema = Joi.object<AlbumCreateDto>({
  artist: Joi.string().required(),
  album: Joi.string().required(),
  stock: Joi.number().required(),
  duration: Joi.string().required(),
  cover: Joi.string().required(),
  price: Joi.string().required(),
  genre: Joi.string().required(),
  recordCompany: Joi.string().required(),
  producer: Joi.string().required(),
  moreInfo: Joi.string().required(),
});

export const albumUpdateDtoSchema = Joi.object<AlbumCreateDto>({
  artist: Joi.string(),
  album: Joi.string(),
  stock: Joi.number(),
  duration: Joi.string(),
  cover: Joi.string(),
  price: Joi.string(),
  genre: Joi.string(),
  recordCompany: Joi.string(),
  producer: Joi.string(),
  moreInfo: Joi.string(),
});
