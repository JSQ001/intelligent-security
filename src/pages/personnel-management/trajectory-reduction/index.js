import React from 'react'
import Unity, { UnityContent } from "react-unity-webgl";



const THREE = require('three');
class TrajectoryReduction extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };

    //this.getThing()
  }
  componentDidMount(){
    this.draw()
    this.init()
  }

  draw(){
    //const canvas = document.getElementById('myCanvas');
    const canvas = this.refs.myCanvas;
    console.log(canvas);

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();                //开始
      ctx.lineWidth = 3;                //边框的宽度
      ctx.moveTo(0, 350);              //三角型的顶点
      ctx.lineTo(100, 250);            //三角型的顶点
      ctx.lineTo(200, 300);            //三角型的顶点
      ctx.closePath();                //可选步骤，关闭绘制的路径
      ctx.strokeStyle = "#CC0000";    //设置线的颜色
      ctx.stroke()

      ctx.fillStyle="#FF0000";
      ctx.fillRect(0,0,150,75);
    }
  }

  getThing(){
    //加载场景代码
    const app = new THING.App({
      // 场景地址
      "url": "http://www.thingjs.com/./uploads/wechat/S2Vyd2lu/scene/Campus04",
    } );
    //场景相关
    //************************************************************************************/
    app.on('load', function () {
      app.camera.flyTo({
        'position': [36.357131498969785, 61.953024217074265, 69.12160670337104],
        'target': [-1.3316924326803257, -4.9370371421622625, 33.619521849828544],
        'time': 2000,
      });
    });

  }


  init = () => {
    // 创建一个场景，它将包含所有元素，如对象，相机和灯光。
    const scene = new THREE.Scene();

    // 创建一个相机，定义我们能看到的位置。
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 创建一个监听对象
    const clickObjects = [];

    // 创建渲染并设置大小和阴影。
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;


    // 创建墙
    let cc = new THREE.BoxGeometry(6, 10, 0.1);
    const cubeWall = new THREE.Mesh(cc, new THREE.MeshLambertMaterial({color: 0xFF0000}));
    cubeWall.position.x = 7;
    cubeWall.position.y = 7;
    cubeWall.position.z = 7;
    cubeWall.rotation.y += 60 * Math.PI; //-逆时针旋转,+顺时针
    scene.add(cubeWall);


    /** 创建立方体 */
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    let cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xFF0000
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    /** 定义立方体的位置 */
    cube.position.x = -4;
    cube.position.y = 2;
    cube.position.z = 0;

    /** 定义球体 */
    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff
    })
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    /** 定义球体的位置 */
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;

    /** 定义地平面 */
    let planeGeometry = new THREE.PlaneGeometry(60, 20);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xAAAAAA});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    console.log(plane)

    /** 旋转定位地平面的位置 */
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;

    /** 将物体添加到场景中 */
    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);

    // 添加监听
    clickObjects.push(cube);
    clickObjects.push(sphere);
    clickObjects.push(plane);

    /** 摆放相机的位置 */
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    /** 为阴影添加聚光灯 */
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    /**
     * 如果你想要更详细的阴影，你可以增加用于绘制阴影的mapSize
     * spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
     */

    scene.add(spotLight);

    let ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    /** 将渲染器的输出添加到html元素 */
    renderer.domElement.id = 'jsq_1';
    document.getElementById("jsq").appendChild(renderer.domElement);

    // 点击事件
    document.getElementById("jsq_1").addEventListener('mousedown', e=>{
      e.preventDefault();
      console.log(e);
      console.log("X:",e.clientX);
      console.log("Y:",e.clientY);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, camera);



      // 获取与raycaster射线相交的数组集合，其中的元素按照距离排序，越近的越靠前
      const intersects = raycaster.intersectObjects(clickObjects); // raycaster.intersectObjects(scene.children);
      console.log(clickObjects)
      console.log(intersects);

      if (intersects.length > 0) {
        // 选中第一个射线相交的物体
        const intersected = intersects[0].object;
        console.log(intersected)
        intersected.material.color.set( 0xff0000 );
      }
    }, false);
  /*  // 点击事件
    const clickObjects=[];
    // 点击射线
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onDocumentMouseDown = event => {
      event.preventDefault();
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // 总结一下，这里必须装网格，mesh，装入组是没有效果的
      // 所以我们将所有的盒子的网格放入对象就可以了
      // 需要被监听的对象要存储在clickObjects中。
      const intersects = raycaster.intersectObjects(clickObjects);

      // console.log(intersects)
      if(intersects.length > 0) {
        // 在这里填写点击代码
        console.log("dianji");
        console.log(intersects[0].object)
        showDetailPage(intersects[0].object.name);

      }

    };
    document.getElementById("jsq").addEventListener('mousedown', onDocumentMouseDown, false);
*/
    /** 调用渲染功能 */
    renderer.render(scene, camera)
  };

  render(){
    const unityContent = new UnityContent(
      "MyGame/Build.json",
      "MyGame/UnityLoader.js"
    );

    return <div>
      轨迹还原
      <canvas id="myCanvas" ref="myCanvas" width="800" height="600">
        哈哈哈
      </canvas>
      <div id="uu"/>
      <div id='jsq'/>
      <div id='test'/>
      <iframe
        title='轨迹还原'
        width="50%"
        height="50%"
        src='https://www.thingjs.com/s/69dc31322b868f71b19c5c85'
      />
      <img src='https://www.thingjs.com/s/69dc31322b868f71b19c5c85' alt=""/>
    </div>
  }
}
export default TrajectoryReduction
