import { memo, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Title } from 'components/common/Title';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormValues, resolver } from 'utils/validations';
import { IList } from 'models/list';

const ButtonsWrapper = styled(Grid)`
  margin-top: 10px;
`;

export const List = memo(
  ({ data, submit }: { data?: IList; submit: (data?: any) => void }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<FormValues>({
      mode: 'onBlur',
      defaultValues: data,
      resolver,
    });

    const navigate = useNavigate();
    const handleBack = useCallback(() => navigate(-1), [navigate]);

    const onSubmit = handleSubmit(async (data) => {
      await submit(data);
      handleBack();
    });

    useEffect(() => {
      if (data) {
        reset(data);
      }
    }, [data, reset]);

    return (
      <>
        <Title>Úprava seznamu</Title>
        <form onSubmit={onSubmit}>
          <TextField
            label="Název"
            {...register('name')}
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors?.name)}
            helperText={errors && errors.name ? errors.name.message : ''}
            fullWidth
          />

          <ButtonsWrapper container justifyContent="flex-end" spacing={1}>
            <Grid item>
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                type="submit"
              >
                Uložit
              </LoadingButton>
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
  },
);
