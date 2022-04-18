import React from 'react';
import { authRoles } from 'app/auth';

const Register = React.lazy(() => import('./show/Register'));

const RegisterConfig = {
    settings: {
        layout: {
            config: {
                mode: 'fullwidth',
                scroll: 'content',
                navbar: {
                    display: true,
                    folded: false,
                    position: 'left',
                },
                toolbar: {
                    display: true,
                    style: 'fixed',
                    position: 'below',
                },
                footer: {
                    display: false,
                    style: 'fixed',
                    position: 'below',
                },
            },
        },
    },
    auth: authRoles.onlyGuest,
    routes: [
        {
            path: '/register',
            exact: true,
            element: <Register />,
        },
    ],
};

export default RegisterConfig;
