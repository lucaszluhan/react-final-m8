import React from 'react';
import { authRoles } from 'app/auth';

const Note = React.lazy(() => import('./show/Note'));
const Notes = React.lazy(() => import('./list/Notes'));

const NotesConfig = {
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
            path: '/notes/:id',
            element: <Note />,
        },
        {
            path: '/notes',
            exact: true,
            element: <Notes />,
        },
    ],
};

export default NotesConfig;
