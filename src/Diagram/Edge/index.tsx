import type {FC} from 'react';
import type {EdgeStruct} from '../model';
import {
  Label,
  Edge as ReaflowEdge,
  EdgeProps as ReaflowEdgeProps
} from 'reaflow';

import * as css from './style';

interface EdgeProps extends Partial<ReaflowEdgeProps> {
  onEdgeClick?(edge: EdgeStruct): void;
}

export const Edge: FC<EdgeProps> = ({onEdgeClick, ...props}) => {
  return (
    <ReaflowEdge
      {...props}
      style={{stroke: css.EDGE_COLOR}}
      removable={false}
      onClick={onEdgeClick ? (_event, data) => onEdgeClick(data) : undefined}
      label={<Label style={{fill: css.LABEL_COLOR}} />}
    />
  );
};
