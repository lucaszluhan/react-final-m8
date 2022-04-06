import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import TableComponent from 'app/fuse-layouts/shared-components/table/Table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/notesSlice';

const columns = [
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Título',
        sort: true,
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Descrição',
        sort: false,
    },
];

export default function Notes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notesRedux = useSelector(selectAll);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleClick(value) {
        navigate(`/products/${value.id}`);
    }

    function handleClickNew() {
        navigate(`/products/new`);
    }

    useEffect(() => {
        setLoading(true);
        dispatch(getAll());
    }, []);

    useEffect(() => {
        if (notesRedux) {
            setLoading(false);
            if (notesRedux.length) {
                const parseNotes = notesRedux.map((item) => {
                    return {
                        ...item,
                    };
                });
                setData(parseNotes);
            }
        }
    }, [notesRedux]);

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden rounded-t-12',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white',
            }}
            header={
                <PageCardedHeader
                    title="Notas"
                    buttonTitle="NOVO"
                    buttonAction={handleClickNew}
                />
            }
            content={
                <TableComponent
                    columns={columns}
                    data={data}
                    action={handleClick}
                />
            }
            innerScroll
        />
    );
}
