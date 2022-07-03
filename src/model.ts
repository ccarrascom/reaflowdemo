import type {NodeData as ReaflowNode, EdgeData as ReaflowEdge} from 'reaflow';
import {NODE_WIDTH, NODE_HEIGHT} from './Diagram/Node/style';

type NodeDefault = 'source' | 'end';
type NodeAction = 'email' | 'sms' | 'tag' | 'webhook';
type NodeCheck = 'waitThenCheck' | 'waitForTrigger';
type NodeDelay = 'wait';
type NodeSplit = 'abTest';

export type NodeType =
  | NodeDefault
  | NodeAction
  | NodeCheck
  | NodeDelay
  | NodeSplit;

interface NodeData {
  type?: NodeType;
  title?: string;
  description?: string;
  showError?: boolean;
  showStats?: boolean;
  stats?: Record<string, number>;
}

export type NodeStruct = ReaflowNode<NodeData>;

const nodes: NodeStruct[] = [
  {
    id: '1',
    data: {
      type: 'source',
      title: 'Source',
      description: 'Automations start.',
      showStats: true,
      stats: {
        started: 0
      }
    }
  },
  {
    id: '2',
    data: {
      type: 'email',
      title: 'Email',
      description: 'Send message to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '3',
    data: {
      type: 'waitThenCheck',
      title: 'Wait then Check',
      description: 'Check behaviour of the contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '4',
    data: {
      type: 'email',
      title: 'Email',
      description: 'Send message to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '5',
    data: {
      type: 'sms',
      title: 'SMS',
      description: 'Send SMS to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '6',
    data: {
      type: 'sms',
      title: 'SMS',
      description: 'Send SMS to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '7',
    data: {
      type: 'sms',
      title: 'SMS',
      description: 'Send SMS to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '8',
    disabled: true,
    data: {
      type: 'end',
      title: 'End',
      description: 'Automation ends.',
      showStats: true,
      stats: {
        completed: 0
      }
    }
  },
  {
    id: '9',
    disabled: true,
    data: {
      type: 'end',
      title: 'End',
      description: 'Automation ends.',
      showStats: true,
      stats: {
        completed: 0
      }
    }
  },
  {
    id: '10',
    data: {
      type: 'waitThenCheck',
      title: 'Wait then Check',
      description: 'Check behaviour of the contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '11',
    data: {
      type: 'email',
      title: 'Email',
      description: 'Send message to contacts with long description.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  },
  {
    id: '12',
    data: {
      type: 'email',
      title: 'Email',
      description: 'Send message to contacts.',
      showStats: true,
      stats: {
        completed: 0,
        running: 0,
        error: 0
      }
    }
  }
];

export interface EdgeData {
  showAddButton?: boolean;
}

export type EdgeStruct = ReaflowEdge<EdgeData>;

const edges: EdgeStruct[] = [
  {
    id: '1-2',
    from: '1',
    to: '2'
  },
  {
    id: '2-3',
    from: '2',
    to: '3'
  },
  {
    id: '3-6',
    from: '3',
    to: '6',
    text: 'Default Condition'
  },
  {
    id: '3-5',
    from: '3',
    to: '5',
    text: 'Condition 1'
  },
  {
    id: '3-7',
    from: '3',
    to: '7',
    text: 'Condition 2'
  },
  {
    id: '3-4',
    from: '3',
    to: '4',
    text: 'Condition 3'
  },
  {
    id: '4-8',
    from: '4',
    to: '8'
  },
  {
    id: '5-9',
    from: '5',
    to: '9'
  },
  {
    id: '7-10',
    from: '7',
    to: '10'
  },
  {
    id: '10-11',
    from: '10',
    to: '11'
  },
  {
    id: '10-12',
    from: '10',
    to: '12'
  }
];

export const createNode = ({id, ...props}: NodeStruct) => ({
  id,
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  ...props
});

export const createEdge = ({from, to, ...props}: Omit<EdgeStruct, 'id'>) => ({
  id: `${from}-${to}`,
  to,
  from,
  ...props
});

export interface Model {
  nodes: NodeStruct[];
  edges: EdgeStruct[];
}

export const model: Model = {
  nodes: nodes.map(createNode),
  edges: edges.map(createEdge)
};
