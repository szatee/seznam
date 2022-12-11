import { forwardRef, memo } from 'react';
import type { ReactNode } from 'react';
import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  min-height: 220px;
  outline: 0;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
`;

export const ModalWrapper = memo(
  forwardRef(({ children }: { children: ReactNode }, _) => (
    <StyledPaper elevation={3} square>
      {children}
    </StyledPaper>
  )),
);
