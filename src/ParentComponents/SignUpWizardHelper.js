import React, {Component} from 'react'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class SignUpWizardHelper extends Component {
	constructor(props){
	    super(props)
	    this.state = {
	      technology_help: false,
	      yard_work: false,
	      indoor_cleaning: false,
	      filing_paperwork: false,
	      heavy_lifting: false,
	      transportation: false,
	      visiting: false,
	      errands: false,
	      other: false,
	    };
	}
	techChange (event) {
		this.setState({technology_help: !this.state.technology_help})
	}
    yardChange (event) {
    	this.setState({yard_work: !this.state.yard_work})
  	}
  	indoorChange (event) {
    	this.setState({indoor_cleaning: !this.state.indoor_cleaning})
  	}
  	filingChange (event) {
    	this.setState({filing_paperwork: !this.state.filing_paperwork})
  	}
  	liftingChange (event) {
    	this.setState({heavy_lifting: !this.state.heavy_lifting})
  	}
  	transportChange (event) {
    	this.setState({transportation: !this.state.transportation})
  	}
  	visitChange (event) {
    	this.setState({visiting: !this.state.visiting})
  	}
  	errandChange (event) {
    	this.setState({errands: !this.state.errands})
  	}
  	otherChange (event) {
    	this.setState({other: !this.state.other})
  	}

	render(){
		return(
			<div>
				<p>Thank you for gifting your skillzzzzz to the community!! Let us know WHAT YA GOT by checking all that apply! </p>
				<div>
					<input
						name="tech" type="checkbox" checked={this.state.technology_help} onChange={this.techChange.bind(this)} />
					<label> Technology Help </label>
				</div>
				<div>
					<input
	    				name="yard" type="checkbox" checked={this.state.yard_work} onChange={this.yardChange.bind(this)} />
	    			<label> Yardwork </label>
	    		</div>	
	    		 <div>	
        			<input
        				name="indoor" type="checkbox" checked={this.state.indoor_cleaning} onChange={this.indoorChange.bind(this)} />
        			<label> Indoor Cleaning </label>
        		</div>
        		<div>
        			<input
        				name="filing" type="checkbox" checked={this.state.filing_paperwork} onChange={this.filingChange.bind(this)} />
        			<label> Filing Paperwork </label>

        		</div>
        		
    		</div>	
        )
	}
}

