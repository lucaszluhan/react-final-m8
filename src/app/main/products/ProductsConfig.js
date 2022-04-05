import React from 'react';
import { authRoles } from 'app/auth';

const Product = React.lazy(() => import('./show/Product'));
const Products = React.lazy(() => import('./list/Products'));

const ProductsConfig = {
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
  auth: authRoles.admin,
  routes: [
    {
      path: '/products/:id',
      element: <Product />,
    },
    {
      path: '/products',
      exact: true,
      element: <Products />,
    },
  ],
};

export default ProductsConfig;
