import {css} from '@emotion/css';

export const Wrapper = css`
  --_automation-canvas-height: calc(100vh - var(--mc-automation-header));
  border: 1px solid var(--mc-automation-canvas-stroke);
  height: var(--_automation-canvas-height);
  position: relative;
  background-color: var(--mc-automation-canvas-background);
  overflow: hidden;
  background-image: -webkit-repeating-radial-gradient(
    top center,
    rgba(0, 0, 0, 0.08),
    rgba(0, 0, 0, 0.08) 1px,
    transparent 0,
    transparent 100%
  );
  background-size: 16px 16px;
`;

export const Controls = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: absolute;
  top: 1.6rem;
  left: 2.4rem;
  z-index: 2;
`;

export const Canvas = css`
  height: var(--_automation-canvas-height);
  overflow: auto;
`;
