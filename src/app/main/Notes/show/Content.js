import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeepCompareEffect } from '@fuse/hooks';

import { showMessage } from 'app/store/fuse/messageSlice';

import objectsKeysEquals from 'app/utils/validations/objectsKeysEquals';
import ButtonDefault from 'app/fuse-layouts/shared-components/button-default/ButtonDeafault';
import { Button, Grid, InputAdornment } from '@mui/material';

import {
    saveOne,
    newData,
    getOne,
    updateOne,
    updateResponse,
    updateLoading,
    deleteOne,
} from '../store/noteSlice';
import { getAll } from '../store/notesSlice';

function Content() {
    const dispatch = useDispatch();
    const routeParams = useParams();
    const navigate = useNavigate();
    const noteRedux = useSelector(({ note }) => note);

    const [contents, setContents] = useState([]);
    const [selectedContents, setSelectedContents] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    useDeepCompareEffect(() => {
        function updateState() {
            const { id } = routeParams;
            if (id === 'new') {
                dispatch(newData());
            } else {
                setLoading(true);
                dispatch(getOne(id));
            }
        }

        updateState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        const { id } = routeParams;
        if (id === 'new') {
            document.getElementById('deleteB').style.display = 'none';
        }
    }, []);

    useEffect(() => {
        if (noteRedux) {
            if (loading) {
                setLoading(noteRedux.loading);
            }
        }
    }, [noteRedux]);

    useEffect(() => {
        function clear() {
            const { id } = routeParams;
            setIsFormValid(false);

            if (id === 'new') {
                dispatch(newData());
                navigate('/notes/new');
            } else {
                dispatch(updateResponse({ message: '', success: false }));
            }
        }

        if (noteRedux?.message && !noteRedux?.success) {
            dispatch(
                showMessage({
                    message: noteRedux?.message,
                    autoHideDuration: 6000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'error',
                })
            );

            clear();
        }
        if (noteRedux?.message && noteRedux?.success) {
            dispatch(
                showMessage({
                    message: noteRedux?.message,
                    autoHideDuration: 6000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'success',
                })
            );

            clear();
        }
    }, [noteRedux.message, noteRedux.success]);

    function canBeSubmitted(modal) {
        if (modal) {
            let diff = false;

            if (modal === true) {
                diff = isFormValid;
            } else {
                diff = objectsKeysEquals(modal, noteRedux);
            }
            const diffContents = noteRedux?.contents?.length !== selectedContents.length;

            if ((diff || diffContents) && !isFormValid) {
                setIsFormValid(true);
            }

            if (!diff && !diffContents && isFormValid) {
                setIsFormValid(false);
            }

            if ((diff && !diffContents) || (!diff && diffContents && !isFormValid)) {
                setIsFormValid(true);
            }
        }
    }

    async function handleSubmit(modal) {
        setLoading(true);
        dispatch(updateLoading(true));

        if (noteRedux?.uid !== 'new') {
            await dispatch(updateOne({ data: modal, id: noteRedux?.uid }));
        } else {
            await dispatch(saveOne(modal));
        }
        navigate('/notes');
    }

    async function handleDelete() {
        setLoading(true);
        dispatch(updateLoading(true));

        await dispatch(deleteOne(noteRedux.uid));

        navigate('/notes');
    }

    function handleSelect(value) {
        setSelectedContents(value);
    }
    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    if (!noteRedux?.uid && loading) {
        return <FuseLoading />;
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <Formsy
                    onValidSubmit={handleSubmit}
                    onChange={canBeSubmitted}
                    onValid={enableButton}
                    onInvalid={disableButton}
                >
                    <TextFieldFormsy
                        className="mb-16 w-full"
                        label="Nome"
                        type="text"
                        name="detail"
                        value={noteRedux.detail}
                        variant="outlined"
                        validations={{ minLength: 3 }}
                        validationErrors={{
                            minLength: 'Preencha o campo com o nome',
                        }}
                        fullWidth
                        autoFocus
                        required
                    />
                    <TextFieldFormsy
                        className="mb-16 w-full"
                        label="Descrição"
                        type="text"
                        name="description"
                        value={noteRedux.description}
                        variant="outlined"
                        validations={{ minLength: 3 }}
                        validationErrors={{
                            minLength: 'Preencha o campo com a descrição',
                        }}
                        fullWidth
                        required
                    />

                    {/* <SelectFormsy
						className="mb-16 w-full"
						label="Recorrência"
						type="select"
						name="payment"
						value={plan.payment}
						variant="outlined"
						fullWidth
					>
						<MenuItem value="" disabled>
							Escolha a recorrência
						</MenuItem>
						{recurrences.map(item => (
							<MenuItem value={item.value}>{item.label}</MenuItem>
						))}
					</SelectFormsy> */}

                    <Grid container item className="flex justify-end items-end">
                        <Grid item xs={7} sm={5} md={4} lg={3} xl={2}>
                            <ButtonDefault
                                fullWidth
                                type="submit"
                                title="Salvar"
                                loading={loading}
                                disabled={!isFormValid}
                            />
                            <ButtonDefault
                                id="deleteB"
                                fullWidth
                                type="button"
                                title="Delete"
                                loading={loading}
                                disabled={!isFormValid}
                                action={handleDelete}
                            />
                        </Grid>
                    </Grid>
                </Formsy>
            </Grid>
        </Grid>
    );
}

export default Content;
