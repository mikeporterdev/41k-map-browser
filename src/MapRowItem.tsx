import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { WtcMap } from './App.tsx';

export class MapRowItem extends React.Component<{ image: WtcMap, numbers: number[], onClick: () => void }> {
  render() {
    return <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', position: 'relative'}}>
      <Image
        centered={true}
        src={`./images/wtc/${this.props.image.id}.png`}
        style={{width: '80%'}}
        alt={`Image ${this.props.image.id}`}
      />
      <Icon
        name={this.props.numbers.includes(this.props.image.id) ? 'star' : 'star outline'}
        color="yellow"
        size="big"
        style={{cursor: 'pointer', position: 'absolute', right: '10px'}}
        onClick={this.props.onClick}
      />
    </div>;
  }
}