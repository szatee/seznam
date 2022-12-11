import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Breadcrumbs as MBreadcrumbs, Typography } from '@mui/material';
import { Link } from './Link';

const Wrapper = styled('div')`
  margin: 20px 0 40px 0;
`;

export const Breadcrumbs = memo(({ item }: { item?: string }) => {
  const { pathname } = useLocation();
  const { isDashboard } = useMemo(() => {
    return {
      isDashboard: pathname === '/',
    };
  }, [pathname]);
  return (
    <Wrapper>
      {isDashboard ? (
        <Typography>Nákupní seznamy</Typography>
      ) : (
        <MBreadcrumbs>
          <Link to="/">Nákupní seznamy</Link>
          <Typography>{item}</Typography>
        </MBreadcrumbs>
      )}
    </Wrapper>
  );
});
