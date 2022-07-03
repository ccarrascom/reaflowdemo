import {FC, useState, useCallback} from 'react';
import {Checkbox, Space} from 'antd';
import {Diagram} from './Diagram';
import {Sidebar, SidebarProps} from './Sider';
import {model, createEdge, NodeStruct, EdgeStruct, Model} from './model';

import * as css from './style';

export const Automation: FC = () => {
  const [nodes, setNodes] = useState<NodeStruct[]>(model.nodes);
  const [edges, setEdges] = useState<EdgeStruct[]>(model.edges);

  const [selection, setSelection] = useState<SidebarProps['selection'] | null>(
    null
  );

  const disableNodes = useCallback(
    (disabled: boolean): void => {
      setNodes(
        nodes.map((node) => ({
          ...node,
          disabled
        }))
      );

      setEdges(
        edges.map((edge) => ({
          ...edge,
          disabled
        }))
      );
    },
    [edges, nodes]
  );

  const showStats = useCallback(
    (showStats: boolean): void => {
      setNodes(
        nodes.map(({data, ...nodeConfig}) => ({
          ...nodeConfig,
          data: {...data, showStats}
        }))
      );
    },
    [nodes]
  );

  const showError = useCallback(
    (showError: boolean): void => {
      setNodes(
        nodes.map(({data, ...nodeConfig}) => ({
          ...nodeConfig,
          data: {...data, showError}
        }))
      );
    },
    [nodes]
  );

  return (
    <>
      <div className={css.Header}>
        <Space size="middle" align="center">
          <Checkbox onChange={(e) => disableNodes(e.target.checked)}>
            Read-Only
          </Checkbox>

          <Checkbox onChange={(e) => showStats(!e.target.checked)}>
            Hide Statistics
          </Checkbox>

          <Checkbox onChange={(e) => showError(e.target.checked)}>
            Show Errors
          </Checkbox>
        </Space>
      </div>

      <Diagram
        selectedId={selection?.source.id}
        edges={edges}
        nodes={nodes}
        onAddClick={(node) => setSelection({type: 'add', source: node})}
        onNodeClick={(node) => setSelection({type: 'node', source: node})}
        onEdgeClick={(edge) => setSelection({type: 'edge', source: edge})}
      />

      <Sidebar
        onNodeSelect={(newEdge, newNode, parentNode) => {
          const updatedModel = updateModel(newNode, parentNode, {nodes, edges});

          if (updatedModel) {
            setNodes(updatedModel?.nodes);
            setEdges(updatedModel?.edges);
            setSelection(null);
          }
        }}
        show={!(selection === null)}
        selection={selection}
        onClose={() => setSelection(null)}
      />
    </>
  );
};

// --- Helpers
function updateModel(
  newNode: NodeStruct,
  parentNode: NodeStruct,
  model: Model
) {
  const parentNodeType = parentNode.data?.type;
  const parentNodeEdge = model.edges.find(({from}) => from === parentNode.id);

  const updatedNodes = [...model.nodes, newNode];

  // --- Append new node
  if (
    !parentNodeEdge ||
    parentNodeType === 'waitThenCheck' ||
    parentNodeType === 'waitForTrigger'
  ) {
    const updatedEdges = [
      ...model.edges,
      createEdge({from: parentNode.id, to: newNode.id})
    ];

    return {
      edges: updatedEdges,
      nodes: updatedNodes
    };
  }

  // --- Insert new node beetween two existing ones
  const updatedEdges = [
    ...model.edges.filter((edge) => edge.id !== parentNodeEdge.id),
    createEdge({from: parentNode.id, to: newNode.id}),
    createEdge({from: newNode.id, to: parentNodeEdge.to})
  ];

  return {
    edges: updatedEdges,
    nodes: updatedNodes
  };
}
