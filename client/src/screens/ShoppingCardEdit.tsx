import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { useQuery, useMutation } from 'utils/query';

import { List } from 'components/List';
import { IList } from 'models/list';

export const ShoppingCardEdit = memo(() => {
  const { id } = useParams();

  const { mutateAsync: updateList } = useMutation({
    route: `list/${id}`,
    method: 'PUT',
  });

  const { data: list } = useQuery<IList>({
    route: `list/${id}`,
  });

  return (
    <>
      <Breadcrumbs item={`Úprava "${list?.name}"`} />
      <List submit={updateList} data={list} />
    </>
  );
});
