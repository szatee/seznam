import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Title = memo(({ children }: { children: string }) => (
  <StyledTypography>{children}</StyledTypography>
));
