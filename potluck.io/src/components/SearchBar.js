import { Button, Input, Form } from 'antd';
import { useEffect } from 'react';

function SearchBar() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form 
      layout="inline"
      action="/search"
      method="get"
      form={form}
      onFinish={onFinish}
    >
        <Form.Item>
          <label htmlFor="header-search">
              <span className="visually-hidden">Search song name</span>
          </label>
        </Form.Item>
        <Form.Item
          name="songName"
        >
          <Input
              type="text"
              placeholder="Search song name"
              style={
                {
                color: 'silver',
                zIndex: 2,
                borderColor: '#D4AF37',
                height: '5vw',
                width: '30vw',
                minHeight: '50px',
                minWidth: '250px',
                fontSize: 'x-large',
                alignContent: 'center',
                justifyContent: 'center'
                }} 
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="ghost"
            htmlType="submit"
            style={
            {
              color: 'black',
              zIndex: 2,
              borderColor: '#D4AF37',
              height: '5vw',
              width: '10vw',
              minHeight: '50px',
              minWidth: '82.3px',
              fontSize: 'large'
          }}>Search</Button>
        </Form.Item>
    </Form>
  );
};

export default SearchBar;