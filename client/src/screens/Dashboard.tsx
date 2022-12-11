import { memo, useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'utils/query';
import { IList } from 'models/list';
import { ListRow } from 'components/ListRow';
import { useModal } from 'utils/hooks/useModal';
import { DeleteModal } from 'components/modals';

export const Dashboard = memo(() => {
  const navigate = useNavigate();
  const [deleteModal, deleteModalOpen, deleteModalClose] = useModal();

  const { mutateAsync: removeAllList } = useMutation({
    route: 'list',
    method: 'DELETE',
  });

  const { data: list = [] } = useQuery<IList[]>({
    route: 'list',
  });

  const handleRedirectCreate = useCallback(
    () => navigate('/shopping-card/add'),
    [navigate],
  );

  const handleRemoveAllList = useCallback(
    () => deleteModalOpen(),
    [deleteModalOpen],
  );

  return (
    <>
      <Breadcrumbs />
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button variant="contained" onClick={handleRedirectCreate}>
            Vytvořit +
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveAllList}
          >
            Zmazat všechny
          </Button>
        </Grid>
      </Grid>
      {list.map((list: IList, index: number) => (
        <ListRow key={index} {...list} />
      ))}
      <DeleteModal
        text="všetky položky"
        open={deleteModal}
        onSubmit={removeAllList}
        onClose={deleteModalClose}
      />
    </>
  );
});
