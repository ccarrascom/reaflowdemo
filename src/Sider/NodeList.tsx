/* eslint-disable @typescript-eslint/no-use-before-define */

import {FC, useCallback} from 'react';
import {Card, Col, Space, Row} from 'antd';
import {nanoid} from 'nanoid';
import {
  createEdge,
  createNode,
  EdgeStruct,
  NodeStruct,
  NodeType
} from '../model';
import {nodeConfig} from '../Diagram/Node/nodeConfig';

import * as css from './style';

interface NodeListProps {
  selectedNode?: NodeStruct;
  onNodeSelect?(
    newEdge: EdgeStruct,
    newNode: NodeStruct,
    parentNode: NodeStruct
  ): void;
}

interface NodeElement {
  name: string;
  value: NodeType;
}

const DEFAULT_NODES: NodeElement[] = [{name: 'End', value: 'end'}];

const ACTION_NODES: NodeElement[] = [
  {name: 'Email', value: 'email'},
  {name: 'SMS', value: 'sms'},
  {name: 'Tag', value: 'tag'},
  {name: 'Webhook', value: 'webhook'}
];

const CHECK_NODES: NodeElement[] = [
  {name: 'Wait Then Check', value: 'waitThenCheck'},
  {name: 'Wait For Trigger', value: 'waitForTrigger'}
];

const DELAY_NODES: NodeElement[] = [{name: 'Wait', value: 'wait'}];

const SPLIT_NODES: NodeElement[] = [{name: 'A/B Test', value: 'abTest'}];

interface NodeCheckboxProps {
  node: NodeElement;
  disabled?: boolean;
  handleCheck(node: NodeElement): void;
}

const NodeCheckbox: FC<NodeCheckboxProps> = ({disabled, node, handleCheck}) => {
  const {icon, color} = nodeConfig(node.value);

  const handleClick = useCallback(() => {
    if (disabled) return;

    handleCheck(node);
  }, [disabled, handleCheck, node]);

  return (
    <Col span={12}>
      <Card
        size="small"
        style={{color}}
        className={css.NodeCard}
        aria-disabled={disabled}
        onClick={handleClick}
      >
        <Space align="center" size="large">
          <span style={{fontSize: 20}}>{icon}</span>
          <span>{node.name}</span>
        </Space>
      </Card>
    </Col>
  );
};

export const NodeList: FC<NodeListProps> = ({selectedNode, onNodeSelect}) => {
  const handleCheck = useCallback(
    (node: NodeElement) => {
      if (!(selectedNode && onNodeSelect)) return;

      const newNode = createNode({
        id: nanoid(5),
        data: {
          type: node.value,
          title: node.name,
          description: 'Automations start.',
          showStats: true,
          stats: {
            started: 0,
            error: 0
          }
        }
      });

      const newEdge = createEdge({
        from: selectedNode.id,
        to: newNode.id
      });

      onNodeSelect(newEdge, newNode, selectedNode);
    },
    [onNodeSelect, selectedNode]
  );

  const disabledNodes = getDisabledNodes(selectedNode);
  const node = renderNode(disabledNodes, handleCheck);

  return (
    <>
      {/* In MC source-code, use <PageTitle /> instead of h6 */}
      <h6>Actions</h6>
      <Row gutter={[16, 16]}>{ACTION_NODES.map(node)}</Row>

      <h6 style={{marginTop: 32}}>Check</h6>
      <Row gutter={[16, 16]}>{CHECK_NODES.map(node)}</Row>

      <h6 style={{marginTop: 32}}>Delay</h6>
      <Row gutter={[16, 16]}>{DELAY_NODES.map(node)}</Row>

      <h6 style={{marginTop: 32}}>Split</h6>
      <Row gutter={[16, 16]}>{SPLIT_NODES.map(node)}</Row>

      <h6 style={{marginTop: 32}}>End</h6>
      <Row gutter={[16, 16]}>{DEFAULT_NODES.map(node)}</Row>
    </>
  );
};

// --- Helpers
function renderNode(
  disabledNode: NodeType[],
  handleCheck: NodeCheckboxProps['handleCheck']
) {
  return (node: NodeElement) => {
    const isDisabled = disabledNode.includes(node.value);
    return (
      <NodeCheckbox
        key={node.value}
        node={node}
        disabled={isDisabled}
        handleCheck={handleCheck}
      />
    );
  };
}

function getDisabledNodes(selectedNode?: NodeStruct): NodeType[] {
  const selectedNodeType = selectedNode?.data?.type;

  switch (selectedNodeType) {
    case 'source':
      return ['end'];
    case 'waitThenCheck':
      return ['waitThenCheck', 'waitForTrigger'];
    case 'wait':
      return ['waitThenCheck', 'waitForTrigger'];
    default:
      return [];
  }
}
