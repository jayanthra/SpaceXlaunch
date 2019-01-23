import React, { Component } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

class LaunchItem extends Component {

    render() {
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-1">
                        <img style={{ height: 80 }} src={this.props.item.links.mission_patch_small} alt="badge"/>
                    </div>
                    <div className="col-md-8">
                        <h4>MISSION: <span>{this.props.item.mission_name}</span></h4>
                        <p><Moment format="DD/MM/YYYY HH:mm">{this.props.item.launch_date_local}</Moment> </p>
                        {this.props.item.launch_success &&
                            <p style={{color:'green'}}>SUCCESS</p>
                        }
                        {!this.props.item.launch_success &&
                            <p style={{color:'red'}}>FAIL</p>
                        }
                    </div>
                    <div className="col-md-3">                 
                        <Link to={`/details/${this.props.item.flight_number}`} className="btn btn-secondary" style={{ border: '1px solid black' }}>Details</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LaunchItem;