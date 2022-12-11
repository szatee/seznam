import { memo } from 'react';
import type { ReactNode } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Grid, Paper, Typography } from '@mui/material';

const Container = styled(Grid)`
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background: #f1f1f1;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  height: 80vh;
  min-width: 30%;
`;

const Title = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.error.main};
  margin-bottom: 20px;
`;

export const Layout = memo(({ children }: { children: ReactNode }) => (
  <Container container>
    <StyledPaper elevation={4}>
      <Title>Muj košík</Title>
      {children}
    </StyledPaper>
  </Container>
));
