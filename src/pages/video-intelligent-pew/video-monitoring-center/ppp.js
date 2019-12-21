import React from 'react'
import { Radio, Row, Col, Input, Button, TreeSelect, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import  MyFlv from './myFlv';

const { SHOW_PARENT } = TreeSelect;


@connect(state=>({
  videoList: state.video.videoList
}))
class PPP extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      pollingType: 'group',
      displayMode: 2,
      createName: '',
      treeData: [
        {
          title: '区域一',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: '区域一监控一',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },
        {
          title: '区域二',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: '区域二监控一',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              title: '区域二监控二',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: '区域二监控三',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      loading: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'video/getVideoList',
      });
    }
  }

  handleCreate = ()=>{
    const { createName, treeData } = this.state;
    const value = new Date().getTime();
    const newGroup = {
        title: createName,
        value,
        key: value,
    };
    treeData.push(newGroup);
    this.setState({treeData})
  };

  handleSearch = () =>{
    const { dispatch } = this.props;
    //this.setState({loading: true});
    console.log(123)
    dispatch({
      type: 'video/getCamera',
    });
  };

  renderContent = ()=>{
    const { videoList } = this.props;
    const { displayMode } = this.state;
    let list = videoList;
    if(videoList.length > displayMode**2){
      list = videoList.slice(0,displayMode**2)
    }
    const content = list.map((item,index)=>{
      const style = {};
      if(index%displayMode === 0){
        style.paddingRight = 5
      }else if(index%displayMode === index){
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
            <MyFlv width={`${100/displayMode}vw`} url={item.url}/>

        </Col>
      )
    });
    return  content
  };

  render(){
    const { pollingType, displayMode, treeData, loading } = this.state;
    return(
      <PageHeaderWrapper
        content={
          <Row>
            <Col span={16}>
              <Input style={{width: '10vw', marginRight: 10}} placeholder="请输入监控点名称"/>
              <Button type="primary" loading={loading} onClick={this.handleSearch}>查询</Button>
              <TreeSelect
                treeData={treeData}
                onChange={()=>{}}
                treeCheckable
                showCheckedStrategy={SHOW_PARENT}
                searchPlaceholder="请选择"
                style={{
                  marginLeft: 25,
                  marginRight: 10,
                  width: '20vw',
                }}
              />
              <Popconfirm
                icon=""
                title={<div>
                  <div>请输入分组名称</div>
                  <Input onBlur={e=>this.setState({createName: e.target.value})}/>
                </div>}
                onConfirm={this.handleCreate}
                okText="确认" cancelText="取消">
                <Button type="primary" onClick={this.handleCreate}>新建分组</Button>
              </Popconfirm>
            </Col>
            <Col style={{textAlign: 'right'}}>
              <Radio.Group
                value={pollingType}
                onChange={e=>{
                  this.setState({
                    pollingType: e.target.value
                  })
                }}>
                <Radio value='group'>按分组轮询</Radio>
                <Radio value='index'>按顺序轮询</Radio>
              </Radio.Group>
              <Radio.Group
                value={displayMode}
                onChange={e=>{
                  this.setState({
                    displayMode: e.target.value
                  })
                }}>
                <Radio value={2}>2*2</Radio>
                <Radio value={3}>3*3</Radio>
                <Radio value={4}>4*4</Radio>
              </Radio.Group>
            </Col>
          </Row>

        }
      >
        {
          this.renderContent()
        }
      </PageHeaderWrapper>
    )
  }
}
export default PPP
