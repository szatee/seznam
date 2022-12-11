import { memo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, TextField } from '@mui/material';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { Title } from 'components/common/Title';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'utils/query';
import { useForm } from 'react-hook-form';
import { FormValues, resolver } from 'utils/validations';

const ButtonsWrapper = styled(Grid)`
  margin-top: 10px;
`;

export const ShoppingCardAdd = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const { mutateAsync: createList } = useMutation({
    route: 'list',
  });

  const onSubmit = handleSubmit(async (data) => {
    await createList(data);
    handleBack();
  });

  return (
    <>
      <Breadcrumbs item={'Vytvoření nového seznamu'} />
      <Title>Vytvoření nového seznamu</Title>
      <form onSubmit={onSubmit}>
        <TextField
          label="Název"
          {...register('name')}
          error={Boolean(errors?.name)}
          helperText={errors && errors.name ? errors.name.message : ''}
          fullWidth
        />

        <ButtonsWrapper container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Button variant="contained" type="submit">
              Vytvořit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleBack}>
              Zpět
            </Button>
          </Grid>
        </ButtonsWrapper>
      </form>
    </>
  );
});
