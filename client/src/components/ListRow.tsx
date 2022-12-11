import { memo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'utils/query';
import { IList } from 'models/list';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { useModal } from 'utils/hooks/useModal';
import { DeleteModal } from './modals';

const ListRowWrapper = styled(Grid)`
  margin: 20px 0;
`;

export const ListRow = memo(({ id, name }: IList) => {
  const navigate = useNavigate();
  const [deleteModal, deleteModalOpen, deleteModalClose] = useModal();
  const { mutateAsync: deleteList } = useMutation({
    route: `list/${id}`,
    method: 'DELETE',
  });

  const handleRedirect = useCallback(
    (href: string) => () => navigate(href),
    [navigate],
  );

  const handleDelete = useCallback(() => deleteModalOpen(), [deleteModalOpen]);

  return (
    <>
      <ListRowWrapper
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography>{name}</Typography>
        </Grid>
        <Grid container xs={6} item spacing={1} justifyContent="flex-end">
          <Grid item>
            <IconButton
              color="primary"
              onClick={handleRedirect(`/shopping-card/${id}`)}
            >
              <Visibility />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={handleRedirect(`/shopping-card/edit/${id}`)}
            >
              <Edit />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="secondary" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </ListRowWrapper>
      <DeleteModal
        open={deleteModal}
        onSubmit={deleteList}
        onClose={deleteModalClose}
      />
    </>
  );
});
