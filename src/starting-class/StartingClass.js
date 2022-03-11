import React from 'react';

import '../App.css';

export function CreateClass(title, vig,min,end,str,dex,int,fai,arc, lvl)
{
    const r = {title: title, startingLevel: lvl, stats: {
        vigor: vig,
        mind: min,
        endurance: end,
        strength: str,
        dexterity: dex,
        intelligence: int,
        faith: fai,
        arcane: arc
    }};
    r.baseStats = JSON.parse(JSON.stringify(r.stats));
    return r;
}

export class ClassTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          stats: this.props.activeClass.stats,
          levels: this.props.levels,
          usedLevels: 0
        };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        const delta = event.target.value - this.props.activeClass.stats[event.target.name];
        const lvl = this.state.levels - this.props.activeClass.startingLevel - this.state.usedLevels;
        // only edit the stats level if the new level is higher or equal to the base stat, also only if you have levels to spare
        if(((delta > 0 && lvl > 0) || delta < 0) && event.target.value >= this.props.activeClass.baseStats[event.target.name]) {
            this.props.activeClass.stats[event.target.name] = event.target.value;
            this.setState({
                stats: this.props.activeClass.stats,
                levels: this.state.levels - delta,
                usedLevels: this.state.usedLevels + delta
              });
              
            this.props.onTableChange();
            this.props.levels = this.state.levels;
        }
        console.log(this.state)
    }

    render(){
        this.state.levels = this.props.levels;
        // render the stat input fields
        return (
            <div className="stat-box">
                <p>{this.props.activeClass.title}</p>
                {Object.keys(this.props.activeClass.stats).map(stat => 
                    <div className="stat" key={stat}>
                        <p>{stat}:</p>
                        <input className="input-style" type="number" key={stat} name={stat} value={this.props.activeClass.stats[stat]} onChange={this.handleChange} />
                    </div>
                )}
                <p>{this.state.levels - this.props.activeClass.startingLevel - this.state.usedLevels}</p>
            </div>
        );
    }
}
