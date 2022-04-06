import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
    const noteRedux = useSelector(({ note }) => note);
    const [note, setNote] = useState({});

    useEffect(() => {
        if (noteRedux) {
            setNote(noteRedux);
        }
    }, [noteRedux]);

    return (
        <PageCardedHeader
            link="/notes"
            title={note?.title || 'Nova nota'}
            textBack="Notas"
        />
    );
}

export default Header;
