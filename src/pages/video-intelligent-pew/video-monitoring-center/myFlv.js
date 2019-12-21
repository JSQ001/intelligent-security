import React, { useEffect } from 'react'
import {Button, Col, Input} from 'antd'
import flvjs from './flvjs/flv.min.js'

const MyFlv = props => {
  const { url, width} = props;

  // let player =  videoElement; //document.getElementById('videoElement');
  let player = null;
  console.log(props)

  // 注意不要省略第二个参数 []，这个参数保证函数只在挂载的时候进行，而不会在更新的时候执行。
  useEffect(() => {
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true, // 直播
        url:  'http://192.168.1.16/live?port=1935&app=live&stream=room2', // 视频地址s
      });
      flvPlayer.attachMediaElement(player);
      flvPlayer.load(); // 加载
      player.play()
    }
  }, []);

  const handleEvent = (event)=>{
    switch (event) {
      case 'start': player.play();break;
      case 'load': player.load();break;
      case 'pause': player.pause();break;
      case 'skip': {
        player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
        break;
      }
      case 'destroy': {
        player.pause();
        player.unload();
        player.detachMediaElement();
        player.destroy();
        player = null;
        break;
      }
      default: player.load();break;
    }
  };

  const btnList = [
    {key: 'start', label: '开始'},
    {key: 'load', label: '加载'},
    {key: 'pause', label: '暂停'},
    {key: 'destroy', label: '停止'},
    {key: 'skip', label: '跳转'},
  ];

  return (
    <div className="controls">
      <div className="mainContainer">
        <video id="videoElement" ref ={e => (player = e)} className="centeredVideo"
               controls
               muted
               autoPlay
               style={{width: '100%'}}
        >
          <track kind="captions" src="sampleCaptions.vtt" srcLang="en"/>
        </video>
        <div style={{width: 20, height: 20}}>
          异常信息
        </div>
      </div>
      {
        btnList.map(item=>(
          <Button
            onClick={() => handleEvent(item.key)}
            key={item.key}>
            {item.label}
          </Button>
        ))
      }
    </div>
  )
};
export default MyFlv
