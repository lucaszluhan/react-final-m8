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
import Api from 'app/services/api';
import { submitLogin } from 'app/auth/store/loginSlice';

function Content() {
    const dispatch = useDispatch();
    const routeParams = useParams();
    const navigate = useNavigate();
    const noteRedux = useSelector(({ note }) => note);

    const [contents, setContents] = useState([]);
    const [selectedContents, setSelectedContents] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(modal) {
        setLoading(true);

        const data = { name: modal.name, password: modal.password };

        if (modal.password === modal.confirmPassword) {
            try {
                await Api.doPost('/users/create', data);
                navigate('/login');
            } catch (error) {
                alert(
                    'Deu ruim, provavelmente usuario ja existe e nao criei o modal pra isso. hehe :D'
                );
            }
            return;
        }

        alert('senhas nao conferem!');
        setLoading(false);
    }

    function handleSelect(value) {
        setSelectedContents(value);
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <Formsy onValidSubmit={handleSubmit}>
                    <TextFieldFormsy
                        className="mb-16 w-full"
                        label="Nome"
                        type="text"
                        name="name"
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
                        label="Senha"
                        type="password"
                        name="password"
                        variant="outlined"
                        validations={{ minLength: 3 }}
                        validationErrors={{
                            minLength: 'Preencha o campo com a senha',
                        }}
                        fullWidth
                        required
                    />
                    <TextFieldFormsy
                        className="mb-16 w-full"
                        label="Confirmação de senha"
                        type="password"
                        name="confirmPassword"
                        variant="outlined"
                        validations={{ minLength: 3 }}
                        validationErrors={{
                            minLength: 'Confirme a senha',
                        }}
                        fullWidth
                        required
                    />

                    <Grid container item className="flex justify-end items-end">
                        <Grid item xs={7} sm={5} md={4} lg={3} xl={2}>
                            <ButtonDefault
                                fullWidth
                                type="submit"
                                title="Salvar"
                                loading={loading}
                                disabled={!isFormValid}
                            />
                        </Grid>
                    </Grid>
                </Formsy>
            </Grid>
        </Grid>
    );
}

export default Content;
