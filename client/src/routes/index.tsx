import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// auth guards
import AuthGuard from '../auth/guards/AuthGuard';
import GuestGuard from '../auth/guards/GuestGuard';
import AccessGuard from '../auth/guards/AccessGuard';

// layouts
import AuthLayout from '../layouts/authLayout/AuthLayout';
import MainLayout from '../layouts/main/MainLayout';

// config
import { PATH_AFTER_LOGIN } from '../config';

// consts
import { PAGE_NAMES } from '../config/config';
import { CAR_PAGE } from './paths';
import { Loading } from '../components';

// ----------------------------------------------------------------------

const Loadable =
  (Component: any) =>
  ({ claims, ...props }: any) => {
    return (
      <Suspense fallback={<Loading />}>
        <AccessGuard claims={claims}>
          <Component {...props} />
        </AccessGuard>
      </Suspense>
    );
  };

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        // { path: 'reset-password', element: <ResetPasswordPage /> },
      ],
    },

    // Car
    {
      path: 'Car',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'List', element: <CarList /> },
        { path: 'Details/:carId', element: <CarDetails /> },
        { path: 'Add', element: <AddCar /> },
        { path: 'Edit/:carId', element: <AddCar isEdit /> },
      ],
    },

    // {
    //   path: 'drive',
    //   element: (<AuthGuard><MainLayout/></AuthGuard>),
    //   children: [
    //     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
    //     { path: 'MyDrive', element: <MyDrive claims={[PAGE_NAMES.Drive]} /> },
    //     { path: 'folder/:id', element: <MyDrive /> },
    //     { path: 'login', element: <LoginPage /> },
    //     { path: 'register', element: <RegisterPage /> },
    //     { path: 'resetPass', element: <ResetPasswordPage /> },
    //     { path: 'page404', element: <Page404 /> },
    //     { path: 'page403', element: <Page403 /> },
    //     { path: 'page500', element: <Page500 /> },
    //   ],
    // },

    // Services
    // {
    //   element: (<CompactLayout />),
    //   children: [
    //     { path: '403', element: <Page403 /> },
    //     { path: '404', element: <Page404 /> },
    //     { path: '500', element: <Page500 /> },
    //   ],
    // },
    // { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/', element: <Navigate to={CAR_PAGE.list} replace /> },
  ]);
}

// ----------------------------------------------------------------------

// AUTH
const LoginPage = Loadable(lazy(() => import('../pages/authPages/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('../pages/authPages/RegistrPage')));
// // const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
// // const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
// const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/resetPassword/ResetPassword')));

// // MAIN
// const Page403 = Loadable(lazy(() => import('../pages/services/Page403')));
// const Page404 = Loadable(lazy(() => import('../pages/services/Page404')));
// const Page500 = Loadable(lazy(() => import('../pages/services/Page500')));

// // Drive
// const MyDrive = Loadable(lazy(() => import('../pages/drive/Drive')));

// TestPages
const CarList = Loadable(lazy(() => import('../pages/car/CarList')));
const CarDetails = Loadable(lazy(() => import('../pages/car/CarDetails')));
const AddCar = Loadable(lazy(() => import('../pages/car/AddCar')));
