import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
  const productRedux = useSelector(({ product }) => product);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (productRedux) {
      setProduct(productRedux);
    }
  }, [productRedux]);

  return (
    <PageCardedHeader
      link="/products"
      title={product?.title || 'Novo produto'}
      textBack="Produtos"
    />
  );
}

export default Header;
