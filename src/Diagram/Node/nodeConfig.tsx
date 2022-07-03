import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  CompassOutlined,
  DatabaseOutlined,
  FlagOutlined,
  LoginOutlined,
  MailOutlined,
  QuestionOutlined,
  TagOutlined
} from '@ant-design/icons';
import type {NodeType} from '../../model';
import * as colors from '@contactlab/ds-tokens/constants/colors';

interface NodeConfig {
  color: string;
  icon: JSX.Element;
}

export const nodeConfig = (type: NodeType): NodeConfig => {
  switch (type) {
    case 'source':
      return {
        color: colors.success,
        icon: <DatabaseOutlined style={{color: colors.success}} />
      };
    case 'email':
      return {
        color: colors.accent,
        icon: <MailOutlined style={{color: colors.accent}} />
      };
    case 'sms':
      return {
        color: colors.accent,
        icon: <CommentOutlined style={{color: colors.accent}} />
      };
    case 'tag':
      return {
        color: colors.accent,
        icon: <TagOutlined style={{color: colors.accent}} />
      };
    case 'webhook':
      return {
        color: colors.accent,
        icon: (
          <QuestionOutlined
            style={{color: colors.accent, transform: 'rotate(180deg)'}}
          />
        )
      };
    case 'waitThenCheck':
      return {
        color: colors.warning,
        icon: <CheckCircleOutlined style={{color: colors.warning}} />
      };
    case 'waitForTrigger':
      return {
        color: colors.warning,
        icon: <LoginOutlined style={{color: colors.warning}} />
      };
    case 'wait':
      return {
        color: colors.fluoAccent900,
        icon: <ClockCircleOutlined style={{color: colors.fluoAccent900}} />
      };
    case 'abTest':
      return {
        color: colors.fluoBase900,
        icon: <CompassOutlined style={{color: colors.fluoBase900}} />
      };
    case 'end':
      return {
        color: colors.base,
        icon: <FlagOutlined style={{color: colors.base}} />
      };
  }
};
