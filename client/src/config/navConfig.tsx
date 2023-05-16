// routes
import { DRIVE_PAGE } from '../routes/paths';

// components
import { PAGE_NAMES } from '../constants/constants';

// ----------------------------------------------------------------------

const navConfig = [
  // {
  //   subheader: 'App',
  //   claims: [PAGE_NAMES.Drive,],
  //   items: [
  //     {title: 'Drive', path: DRIVE_PAGE.drive, icon: svgList.myPC, claims: [PAGE_NAMES.Drive,],},
  //   ],
  // },
  // {
  //   subheader: 'Authentication',
  //   claims: [PAGE_NAMES.Drive,],
  //   items: [
  //     {title: 'Login', path: DRIVE_PAGE.login, icon: svgList.login, claims: [PAGE_NAMES.Drive,],},
  //     {title: 'Register', path: DRIVE_PAGE.register, icon: svgList.registration, claims: [PAGE_NAMES.Drive,],},
  //     {title: 'Reset password', path: DRIVE_PAGE.resetPass, icon: svgList.password, claims: [PAGE_NAMES.Drive,],},
  //   ],
  // },
  {
    subheader: 'Error pages',
    claims: [PAGE_NAMES.Drive,],
    items: [
      // {title: '403', path: DRIVE_PAGE.page403, icon: '', claims: [PAGE_NAMES.Drive,],},
      // {title: '404', path: DRIVE_PAGE.page404, icon: '', claims: [PAGE_NAMES.Drive,],},
      // {title: '500', path: DRIVE_PAGE.page500, icon: '', claims: [PAGE_NAMES.Drive,],},
    ],
  },
  // {
  //   subheader: 'NAVIGATION.ADMINISTRATION',
  //   claims: [
  //     PAGE_NAMES.Drive,
  //   ],
  //   items: [
  //     {
  //       title: 'USEDARS.TITLE',
  //       path: PAGE_NAMES.Drive,
  //       icon: ICONS.user,
  //       claims: [
  //         PAGE_NAMES.Drive,
  //       ],
  //       children: [
  //         { title: 'USERS.LIST', path: PAGE_NAMES.Drive, claims: [PAGE_NAMES.Drive] },
  //         { title: 'USERS.ADMIN', path: PAGE_NAMES.Drive, claims: [PAGE_NAMES.Drive] },
  //         { title: 'USERS.TRAINER', path: PAGE_NAMES.Drive, claims: [PAGE_NAMES.Drive] },
  //         { title: 'ROLES.TITLE', path: PAGE_NAMES.Drive, claims: [PAGE_NAMES.Drive] },
  //         { title: 'ACCESS.LIST', path: PAGE_NAMES.Drive, claims: [PAGE_NAMES.Drive] },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
