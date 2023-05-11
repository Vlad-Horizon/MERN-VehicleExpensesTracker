export const port = 3002;
export const connectWithRetryTime = 10000;

export const mongoURL = 'mongodb+srv://...';

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
    key: 'HGshdfjsgfahjGKSDFHGShf^%$^5aghfjhfgJKSGFhdsfgh6^#%4',
    type: 'access',
  },
  refresh: {
    exp: '7d',
    key: 'ADkbsdhbfoBSDFbo&478w5&*%^47ehbfgjknfgjshgughaoiruhO&$%&#$*5',
    type: 'refresh',
  },
}
