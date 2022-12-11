import { memo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation } from 'utils/query';

const Wrapper = styled(Grid)`
  margin-top: 20px;
`;

export const Item = memo(({ id, name }: { id: string; name: string }) => {
  const { mutateAsync: deleteItem } = useMutation({
    route: `item/${id}`,
    method: 'DELETE',
  });

  const handleDeleteItem = useCallback(
    async () => await deleteItem({}),
    [deleteItem],
  );

  return (
    <Wrapper item container alignItems="center">
      <Grid item xs={1}>
        <IconButton color="secondary" onClick={handleDeleteItem}>
          <Close />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
    </Wrapper>
  );
});
