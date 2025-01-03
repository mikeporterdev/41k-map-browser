import React from 'react';
import {Image} from 'semantic-ui-react';
import {MapInfo} from './App.tsx';

export class MapRowItem extends React.Component<{ image: MapInfo, mapMaker: string }> {
  render() {
    const {image, mapMaker} = this.props;

    return <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', position: 'relative', width: '70%'}}>
      <Image
        centered={true}
        src={`./images/${mapMaker}/${image.id}.png`}
        style={{width: '80%'}}
        alt={`Image ${image.id}`}
      />
    </div>;
  }
}