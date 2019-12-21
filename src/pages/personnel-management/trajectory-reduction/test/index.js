import * as THREE from 'three';
import earcut from 'earcut';

export const floor = (points,height)=>{
  const topPoints = [];
  for(let i=0; i< points.length; i++){
    const vertice = points[i];
    topPoints.push([vertice[0],vertice[1]+height,vertice[2]]);
  }
  const totalPoints = points.concat(topPoints);
  const vertices = [];   // 所有的顶点
  for(let i=0; i<totalPoints.length; i++){
    vertices.push(new THREE.Vector3(totalPoints[i][0],totalPoints[i][1],totalPoints[i][2]))
  }
  var length = points.length;
  var faces = [];
  for(var j=0;j<length;j++){  // 侧面生成三角形
    if(j!=length-1){
      faces.push(new THREE.Face3(j,j+1,length+j+1));
      faces.push(new THREE.Face3(length+j+1,length+j,j));
    }else{
      faces.push(new THREE.Face3(j,0,length));
      faces.push(new THREE.Face3(length,length+j,j));
    }
  }
  const data=[];
  for(let i=0; i<length; i++){
    data.push(points[i][0],points[i][2]);
  }
  let triangles = Earcut.triangulate(data);
  if(triangles && triangles.length != 0){
    for(let i=0;i<triangles.length;i++){
      let tlength = triangles.length;
      if(i%3===0 && i < tlength-2){
        faces.push(new THREE.Face3(triangles[i],triangles[i+1],triangles[i+2])); // 底部的三角面
        faces.push(new THREE.Face3(triangles[i]+length,triangles[i+1]+length,triangles[i+2]+length)); // 顶部的三角面
      }
    }
  }
  const geometry = new THREE.Geometry();
  geometry.vertices = vertices;
  geometry.faces = faces;
  geometry.computeFaceNormals();  // 自动计算法向量
  return geometry;
};
