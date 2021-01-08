import React from 'react';
import ProTypes from 'prop-types';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const FollowList = ({ header, data }) => (
  <List
    style={{ marginBottom: 20 }}
    grid={{
      gutter: 4, xs: 2, sm: 3, md: 4,
    }}
    size="small"
    header={<div>{header}</div>}
    loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button>더 보기</Button></div>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ marginTop: 20 }}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);
FollowList.propTypes = {
  header: ProTypes.string.isRequired,
  data: ProTypes.array,
};

export default FollowList;
