 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react');

require('../less/room-roster.less');

export class RoomRoster extends React.Component {

  render(){
    var people = this.props.roster.map((item) => <li>{item}</li>);

    return (
      <div className="room-roster">
        <div className="room-number-participants">
          <i className="mdi mdi-emoticon-happy"></i><span>{ people.length }</span>
        </div>
        <ul>
          { people }
        </ul>
      </div>
    );
  }

};
