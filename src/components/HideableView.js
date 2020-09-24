import React from 'react';

class HideableView extends React.Component {
  render(){
      if(this.props.visible){
        return this.props.children;
      }
      return(
          null
      );
  }
}

export default HideableView;