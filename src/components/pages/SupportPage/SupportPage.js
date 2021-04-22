import React from 'react';
import { Button, Typography, Form, Input } from 'antd';
import './SupportPage.css';

const SupportPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div className="supportRoot">
      <div className="form">
        <Form className="contactForm">
          <Title level={2}> Contact Us </Title>
          <Form.Item
            label="Message"
            name="Message"
            rules={[
              {
                required: true,
                message: 'Please input a message',
              },
            ]}
          >
            <Input className="textField" placeholder="Message" />
          </Form.Item>
          <Form.Item>
            <Button className="formBtn" type="primary" htmlType="submit">
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="faq">
        <Title level={2}> FAQ </Title>
        <Title level={4}>Q: How do I upload a case?</Title>
        <Paragraph>
          A: Please navigate to the "Upload Case" page via the menu to the left
          of your screen to upload your case files. Once your files are
          succesfully uploaded, our system will comb through them and extract
          the necessary information to then populate the form to the right of
          the screen on the case upload page for your final approval before
          completing your submission.
        </Paragraph>
      </div>
    </div>
  );
};

export default SupportPage;
