import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.SERVER_PORT || 3000;
export const connectWithRetryTime = 10000;

export const mongoURL = process.env.DB_URL;

export const folderToSaveImg = 'images';
export const pathToServer = 'D:/db/MyProjects/businessManagementSystem/server';

export const regex = {
  userName: /^[A-Z][a-z]+$/,
  password: /^.{1,30}$/,
  mongoId: /^[a-z0-9]{24}$/,
  
  car: {
    brend: /^[A-Za-z0-9А-Яа-я -]+$/,
    model: /^[A-Za-z0-9А-Яа-я -]+$/,
    year: /^[0-9]{4}$/,
    number: /^[А-Я]{2}[0-9]{4}[А-Я]{2}$/,
    price: /^[0-9]+$/,
  },

  carCost: {
    name: /^[A-Za-z0-9А-Яа-я -]+$/,
    category: /^[A-Za-z0-9А-Яа-я -]+$/,
    date: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
    number: /^[0-9]+$/,
    price: /^[0-9]+$/,
  },
}

export const jwtConfig = {
  access: {
    exp: '24h',
    key: process.env.ACCESS_TOKEN_KEY || 'Adafd#$sdfsvf$33bJH%B#$5b3ja45jhbajh454h6jbb',
    type: 'access',
  },
  refresh: {
    exp: '7d',
    key: process.env.REFRESH_TOKEN_KEY|| '#FDer5$%53f$33bJH%B#$5%$eggFdsfw34554Fdsfbb',
    type: 'refresh',
  },
}
