// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DRIVE = '/Drive';
const ROOTS_CAR = '/Car';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  register: path(ROOTS_AUTH, '/register'),
  // verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const DRIVE_PAGE = {
  drive: path(ROOTS_DRIVE, '/MyDrive'),
  folder: path(ROOTS_DRIVE, '/folder'),
};


export const CAR_PAGE = {
  list: path(ROOTS_CAR, '/List'),
  details: path(ROOTS_CAR, '/Details'),
  add: path(ROOTS_CAR, '/Add'),
  edit: path(ROOTS_CAR, '/Edit'),
};
