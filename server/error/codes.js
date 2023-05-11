export const errorCodes = {
  /*
    // 1012345

    10 - const
    12 - controllers groups (auth, car, carCost ...)
    34 - controller in group
    56 - error in controller
  */

  /*
    * global (10_01_00_00)
    * middleware (10_02_00_00)
    * authorization (10_03_00_00)
    * car (10_04_00_00)
    * cost (10_05_00_00)
*/

  requestErrors: {
    noDataAvailable: 10_01_00_01,
    invalidData: 10_01_00_02,
  },

  middleware: {
    auth: {
      noToken: 10_02_01_01,
      noDate: 10_02_01_02,
      invalidTokenType: 10_02_01_03,
      userNotFound: 10_02_01_04,
      tokenNotFound: 10_02_01_05,
    }
  },

  controllers: {
    authorization: {
      registration: {
        noData: 10_03_01_01,
        invalidData: 10_03_01_02,
        nameExist: 10_03_01_03,
      },
      login: {
        noData: 10_03_02_01,
        invalidData: 10_03_02_02,
        errorUser: 10_03_02_03,
        errorPass: 10_03_02_04,
      },
      refresh: {
        noData: 10_03_03_01,
        invalidTokenType: 10_03_03_02,
        userNotFound: 10_03_03_03,
      },
      logout: {
        noData: 10_03_04_01,
        invalidData: 10_03_04_02,
      },
    },
    car: {
      create: {
        noData: 10_04_01_01,
        invalidData: 10_04_01_02,
      },
      getById: {
        noData: 10_04_02_01,
        invalidData: 10_04_02_02,
        carNotFound: 10_04_02_03,
      },
      edit: {
        noData: 10_04_03_01,
        invalidData: 10_04_03_02,
        errorEdit: 10_04_03_03,
      },
      delete: {
        noData: 10_04_04_01,
        invalidData: 10_04_04_02,
        errorDelete: 10_04_04_03,
      },
    },
    carCost: {
      add: {
        noData: 10_05_01_01,
        invalidData: 10_05_01_02,
        errorSurchCar: 10_05_01_03,
      },
      getAll: {
        noData: 10_05_02_01,
        invalidData: 10_05_02_02,
        errorGetCosts: 10_05_02_03,
      },
      edit: {
        noData: 10_05_03_01,
        invalidData: 10_05_03_02,
        errorEdit: 10_05_03_03,
      },
      delete: {
        noData: 10_05_04_01,
        invalidData: 10_05_04_02,
        errorDelete: 10_05_04_03,
      },
    },
  },
}