import React from 'react';

export default class HideableView extends React.Component {
  render(){
      if(this.props.visible){
        return this.props.children;
      }
      return(
          null
      );
  }
}