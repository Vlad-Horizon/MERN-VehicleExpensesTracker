// ----------------------------------------------------------------------

const protocol = {
  http: 'http',
  https: 'https',
  ws: 'ws',
};

const url = {
  localHost: '127.0.0.1:3002',
  api_1: '192.168.43.197:3002',
  api_2: process.env.REACT_APP_API_URL,
};

const CLEAN_API = url.api_2;

// export const API = `${CLEAN_API}/api`
export const API = `${CLEAN_API}`;

// ----------------------------------------------------------------------

export enum PAGE_NAMES {
  // drive
  Drive = 'test',
}

// ----------------------------------------------------------------------

export const regPatterns = {
  userName: /^([A-Z][a-z]*|[A-Z][a-z]*[ ][A-Z][a-z]*)$/,
  password: /^[A-Za-z0-9 \.!"№;%:?*()_\-=+^&#@]{8,30}$/,

  car: {
    brend: /^[A-Za-z0-9А-Яа-я -ІіЇї'`Єє]+$/,
    model: /^[A-Za-z0-9А-Яа-я -ІіЇї'`Єє]+$/,
    year: /^[0-9]{4}$/,
    number: /^[А-Я]{2}[0-9]{4}[А-Я]{2}$/,
    price: /^[0-9]+$/,
  },

  carCost: {
    name: /^[A-Za-z0-9А-Яа-я -ІіЇї'`Єє]+$/,
    category: /^[A-Za-z0-9А-Яа-я -ІіЇї'`Єє]+$/,
    date: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
    number: /^[0-9]+$/,
    price: /^[0-9]+$/,
  },
};

// ----------------------------------------------------------------------
