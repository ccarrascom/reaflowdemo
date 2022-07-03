import {css} from '@emotion/css';

export const NodeCard = css`
  border-left: 4px solid currentColor;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:not([aria-disabled='true']):hover {
    box-shadow: var(--elevation-z1);
  }

  span {
    color: var(--color-base);
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
