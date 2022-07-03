import type {FC} from 'react';
import {Button, Drawer} from 'antd';
import type {EdgeStruct, NodeStruct} from '../model';
import {EdgeProperties} from './EdgeProperties';
import {NodeProperties} from './NodeProperties';
import {NodeList} from './NodeList';

export interface SidebarProps {
  show: boolean;
  selection: Entries | null;
  onClose?(): void;
  onNodeSelect?(
    newEdge: EdgeStruct,
    newNode: NodeStruct,
    parentNode: NodeStruct
  ): void;
}

type Entries =
  | Entry<'add', NodeStruct>
  | Entry<'node', NodeStruct>
  | Entry<'edge', EdgeStruct>;

interface Entry<T, S> {
  type: T;
  source: S;
}

export const Sidebar: FC<SidebarProps> = ({
  selection,
  show,
  onClose,
  onNodeSelect
}) => {
  const commonProps = {
    onClose,
    width: 540,
    visible: show,
    closable: false
  };

  const Extra = <Button onClick={onClose}>Close</Button>;

  switch (selection?.type) {
    case 'edge':
      return (
        <Drawer {...commonProps} title="Edge Properties" extra={Extra}>
          <EdgeProperties edge={selection.source} />
        </Drawer>
      );
    case 'node':
      return (
        <Drawer {...commonProps} title="Node Properties" extra={Extra}>
          <NodeProperties node={selection.source} />
        </Drawer>
      );
    default:
      return (
        <Drawer {...commonProps} title="Add new node" extra={Extra}>
          <NodeList
            selectedNode={selection?.source}
            onNodeSelect={onNodeSelect}
          />
        </Drawer>
      );
  }
};
