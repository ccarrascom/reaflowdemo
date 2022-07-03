import {FC, useEffect} from 'react';
import {Checkbox, Form, Input} from 'antd';
import {NodeStruct} from '../model';

export const NodeProperties: FC<{node: NodeStruct}> = ({node}) => {
  const [form] = Form.useForm();

  const title = node?.data?.title;

  useEffect(() => {
    form.setFieldsValue({
      title,
      id: node?.id,
      description: node?.data?.description,
      disabled: node?.disabled
    });
  }, [form, node, title]);

  return (
    <>
      {title ? <h1>{title}</h1> : null}

      <Form form={form} layout="vertical" name="properties">
        <Form.Item label="ID" name="id">
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item name="disabled" valuePropName="checked">
          <Checkbox>Disabled</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};
