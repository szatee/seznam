import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, IconButton as MIconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormValues, resolver } from 'utils/validations';
import { Add } from '@mui/icons-material';
import { useMutation } from 'utils/query';

const IconButton = styled(MIconButton)`
  margin-top: -20px;
`;

export const ItemAdd = memo(({ id }: { id: string }) => {
  const { mutateAsync: createItem } = useMutation({
    route: `item`,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createItem({ name: data.name, listId: id });
      reset();
    } catch (e: any) {
      setError('name', {
        type: 'custom',
        message: e.toString(),
      });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Název položky"
              {...register('name')}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.name)}
              helperText={errors && errors.name ? errors.name.message : ' '}
              fullWidth
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" type="submit">
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
});
