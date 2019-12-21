import { Effect } from 'dva';
import { Reducer } from 'redux';

import { getVideoList, getCamera } from '@/services/video';


export interface VideoModelState {
  videoList?: Array<any>;
}

export interface VideoModelType {
  namespace: 'video';
  state: VideoModelState;
  effects: {
    getVideoList: Effect;
    getCamera: Effect;
  };
  reducers: {
    setVideoList: Reducer<VideoModelState>;
  };
}

const VideoModel: VideoModelType = {
  namespace: 'video',

  state: {
    videoList: [],
  },

  effects: {
    *getVideoList(_, { call, put }) {
      const response = yield call(getVideoList);
      yield put({
        type: 'setVideoList',
        payload: response.data,
      });
    },
    *getCamera(_, { call, put }) {
      const response = yield call(getCamera);
      console.log(response)
      yield put({
        type: 'setVideoList',
        payload: response.data,
      });
    },

  },

  reducers: {
    setVideoList(state, action) {
      return {
        ...state,
        videoList: action.payload || [],
      };
    },
  },
};

export default VideoModel;
