import React, { Fragment } from 'react';
import playerProps from './playerProps';
import VideoPlayer from './videoPlayer';
import Video from './player';
import HttpFlv from './httpFlv';

type Props = {
  color?: string;
};

const videoJsOptions = {
  autoplay: true, //自动播放
  language: 'zh-CN',
  controls: true, //控制条
  preload: 'auto', //自动加载
  errorDisplay: true, //错误展示
  width: 500, //宽
  height: 300, //高
  // fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
  // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
  // textTrackDisplay: false,  // 不渲染字幕相关DOM
  userActions: {
    hotkeys: true, //是否支持热键
  },
  sources: [
    {
      src: 'rtmp://192.168.1.10:1935/live/room2',
      type: 'rtmp/flv', //类型可加可不加，目前未看到影响
      // type: 'video/mp4',
    },
  ],
};

const VideoMonitoring: React.SFC<Props> = () => (
  <Fragment>
    <div style={{ width: 400, height: 400 }}>
      <VideoPlayer {...playerProps} />
    </div>

    <Video {...videoJsOptions} />


    <HttpFlv />

  </Fragment>
);


export default VideoMonitoring;
