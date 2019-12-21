import request from '@/utils/request';

export async function getVideoList(): Promise<any> {
  return request('/api/video/list');
}

export async function getCamera(areaId:Number = 1): Promise<any> {
  return request(`/api/camera/findCameraByArea?areaId=${areaId}`,{method: 'POST'});
}
