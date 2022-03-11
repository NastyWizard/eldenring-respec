import React from 'react';

import './App.css';
import * as sc from './starting-class/StartingClass.js'

const startingClasses = {
  HERO: sc.CreateClass("HERO", 14, 9, 12, 16, 9, 7, 8, 11, 7),
  BANDIT: sc.CreateClass("BANDIT", 10, 11, 10, 9, 13, 9, 8, 14, 5),
  ASTROLOGER: sc.CreateClass("ASTROLOGER", 9, 15, 9, 8, 12, 16, 7, 9, 6),
  WARRIOR: sc.CreateClass("WARRIOR", 11, 12, 11, 10, 16, 10, 8, 9, 8),
  PRISONER: sc.CreateClass("PRISONER", 11, 12, 11, 11, 14, 14, 6, 9, 9), //
  CONFESSOR: sc.CreateClass("CONFESSOR", 14, 9, 12, 16, 9, 7, 8, 11, 10),
  WRETCH: sc.CreateClass("WRETCH", 14, 9, 12, 16, 9, 7, 8, 11, 1),
  VAGABOND: sc.CreateClass("VAGABOND", 14, 9, 12, 16, 9, 7, 8, 11, 9),
  PROPHET: sc.CreateClass("PROPHET", 14, 9, 12, 16, 9, 7, 8, 11, 7),
  SAMURAI: sc.CreateClass("SAMURAI", 14, 9, 12, 16, 9, 7, 8, 11, 9)
};

let activeClass = startingClasses.PRISONER;

class ClassDropdown extends React.Component
{
  childref = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "PRISONER",
      inputLevel: activeClass.startingLevel
    };
    
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    activeClass = startingClasses[this.state.selectValue];
  }

  handleDropdownChange(e) {
    activeClass.stats = JSON.parse(JSON.stringify(activeClass.baseStats));
    activeClass = startingClasses[e.target.value];
    this.setState({selectValue: e.target.value, inputLevel: activeClass.startingLevel});
  }

  handleTableChange(e) {
    this.setState(this.state);
  }

  handleLevelChange(e) {
    if(e.target.value >= activeClass.startingLevel)
      this.state.inputLevel = e.target.value
    else
      this.state.inputLevel = activeClass.startingLevel
    this.setState(this.state);
    this.childref.current.forceUpdate();
  }

  render() {
    return (
      <div>
        <select className="input-style" value={this.state.selectValue} onChange={this.handleDropdownChange}>
            {Object.keys(startingClasses).map(title => <option key={title} value={title}>{title}</option>)}
        </select>

        <div className="stat" key="level">
            <p>lvl:</p>
            <input className="input-style" type="number" key="level" name="level" value={this.state.inputLevel} onChange={this.handleLevelChange} />
        </div>

        <sc.ClassTable activeClass={activeClass} levels={this.state.inputLevel} ref={this.childref}/>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>Elden Ring Stat Respec Helper</p>
        <ClassDropdown />
      </div>
    </div>
  );
}

export default App;
