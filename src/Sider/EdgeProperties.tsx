import {FC, useEffect} from 'react';
import {Checkbox, Form, Input} from 'antd';
import {EdgeStruct} from '../model';

export const EdgeProperties: FC<{edge: EdgeStruct}> = ({edge}) => {
  const [form] = Form.useForm();

  const id = edge?.id;

  useEffect(() => {
    form.setFieldsValue({
      id,
      from: edge?.from,
      to: edge?.to,
      disabled: edge?.disabled
    });
  }, [form, edge, id]);

  return (
    <>
      {id ? <h1>Edge {id}</h1> : null}

      <Form form={form} layout="vertical" name="properties">
        <Form.Item label="ID" name="id">
          <Input />
        </Form.Item>

        <Form.Item label="Initial Node ID" name="from">
          <Input />
        </Form.Item>

        <Form.Item label="Ending Node ID" name="to">
          <Input />
        </Form.Item>

        <Form.Item name="disabled" valuePropName="checked">
          <Checkbox>Disabled</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};
