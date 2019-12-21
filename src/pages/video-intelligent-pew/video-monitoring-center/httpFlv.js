import React, { PureComponent } from 'react';
import VideoFlv from 'reflv';

export class HttpFlv extends PureComponent {

  render() {
    const { url } = this.props;
    return (
      <VideoFlv
        url={url}
        type="flv"
        isLive
        cors
      />
    )
  }
}
export default HttpFlv
