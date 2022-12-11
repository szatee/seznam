import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { Title } from 'components/common/Title';
import { Button, CircularProgress, Grid } from '@mui/material';
import { IList } from 'models/list';
import { useQuery } from 'utils/query';
import { Item, ItemAdd } from 'components/item';

export const ShoppingCard = memo(() => {
  const { id } = useParams();

  const { data: list } = useQuery<IList>({
    route: `list/${id}`,
  });

  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return list ? (
    <>
      <Breadcrumbs item={'Položky seznamu ' + list.name} />
      <Title>{list.name}</Title>
      <ItemAdd id={list.id} />
      <Grid container flexDirection="column">
        {list.items?.map(({ id, name }, index) => (
          <Item key={index} id={id} name={name} />
        ))}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button variant="outlined" onClick={handleBack}>
          Zpět
        </Button>
      </Grid>
    </>
  ) : (
    <Grid container justifyContent="center">
      <CircularProgress />
    </Grid>
  );
});
