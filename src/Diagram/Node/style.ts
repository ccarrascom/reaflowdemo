import {css} from '@emotion/css';

export const NODE_WIDTH = 260;
export const NODE_HEIGHT = 164;
export const NODE_BUTTON_SIZE = 32;

export const NodeStyleReset = css`
  fill: transparent;
  stroke: transparent;
`;

export const NodeWrapper = css`
  position: relative;
`;

export const NodeContent = css`
  display: grid;
  grid-template-columns: 1fr var(--mc-automation-node-icon-size);
  gap: 1.6rem;
  width: ${NODE_WIDTH}px;
  height: ${NODE_HEIGHT - NODE_BUTTON_SIZE / 2}px;
  padding: 1.6rem;
  padding-bottom: 2.4rem;
  border: 1px solid var(--mc-automation-node-stroke);
  border-left: 4px solid currentColor;
  border-radius: 2px;
  background-color: var(--mc-automation-node-background);
  transition: border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &[aria-selected='true'] {
    border-color: currentColor;
    box-shadow: var(--elevation-z2);
  }
`;

export const NodeDetails = css`
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  display: grid;
  grid-template-rows: min-content minmax(auto, 38px);
  gap: 0.8rem;
  color: var(--mc-automation-node-foreground);

  > :is(h1, p) {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > h1 {
    margin-bottom: 0;
    font-size: 14px;
    white-space: nowrap;
  }

  > p {
    margin-bottom: 0;
  }
`;

export const NodeIcon = css`
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  font-size: var(--mc-automation-node-icon-size);
  line-height: 1;
`;

export const NodeStats = css`
  list-style: none;
  padding: 0;
  grid-row: 2 / span 1;
  grid-column: 1 / span 2;
  align-self: end;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: calc(100% / 3);
  gap: 0.8rem;
  font-size: 12px;
  color: var(--mc-automation-node-foreground);

  > li > span {
    display: block;
    text-transform: capitalize;

    &::after {
      content: ':';
    }
  }
`;

export const AddButton = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, ${NODE_BUTTON_SIZE / 2}px);
  bottom: 0;
`;
