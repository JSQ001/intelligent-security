import React from 'react'
import { Row, Col} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MyFlv from "../video-monitoring-center/myFlv";

const FaceRecognition  = props =>{

  const titleStyle = {
    fontWeight: 600,
    color: 'rgb(0,0,0,0.85)',
    fontSize: 18
  };

  const renderContent = ()=>{

    const displayMode = 2;
    const list = [
      {
        name: '监控1',
        url: ''
      },
      {
        name: '监控2',
        url: ''
      },
      {
        name: '监控3',
        url: ''
      },
      {
        name: '监控4',
        url: ''
      }
    ]
    const content = list.map((item,index)=>{
      const style = {};
      if(index%displayMode === 0){
        style.paddingRight = 5
      }else if(index%displayMode === displayMode){
        style.paddingLeft = 5
      }else {
        style.paddingRight = 5;
        style.paddingLeft = 5
      }
      return (
        <Col
          key={item.name}
          style={style}
          span={24/displayMode}>
          <div style={{height: '10vh',background: 'white'}}>{item.name}</div>
        </Col>
      )
    });
    return  content
  };

  return (
    <PageHeaderWrapper
      content={
        <Row style={{textAlign: 'center'}}>
          <Col span={8}>
            <span style={titleStyle}>今日来访人数: </span>
            <span>12</span>
          </Col>
          <Col span={8}>
            <span style={titleStyle}>VIP: </span>
            <span>12</span>
          </Col>
          <Col span={8}>
            <span style={titleStyle}>访客: </span>
            <span>12</span>
          </Col>
        </Row>
      }
    >
      {renderContent()}
  </PageHeaderWrapper>
  )
};
export default FaceRecognition
