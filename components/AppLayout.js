import React, { useState, useCallback } from 'react';
import ProTypes from 'prop-types';
import Link from 'next/link';
import {
  Layout, Menu, Input, Row, Col, Breadcrumb,
} from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const { Header, Content } = Layout;
const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:first-child {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
`;
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState('');
  const onChangeSearchInput = useCallback((e) => {
    setSearchInput(e.target.value);
  }, [searchInput]);
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <Layout className="layout">
      <Global />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link href="/"><a>노드버드</a></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/profile"><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <SearchInput
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ minHeight: '400px', padding: '24px', backgroundColor: '#FFF' }}>
          {/* gutter 컬럼 사이의 간격 */}
          <Row gutter={12}>
            <Col xs={24} sm={6} md={6} style={{ paddingTop: '12px' }}>
              {me ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} sm={18} md={18} style={{ paddingTop: '12px' }}>
              {children}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default AppLayout;
