import { memo } from 'react';
import type { ReactNode } from 'react';
import { Link as MLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(MLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  :hover {
    text-decoration: underline;
  }
`;

export const Link = memo(
  ({ children, to }: { children: ReactNode; to: string }) => (
    <StyledLink to={to}>{children}</StyledLink>
  ),
);
