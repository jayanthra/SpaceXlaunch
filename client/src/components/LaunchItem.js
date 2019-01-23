import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
class LaunchItem extends Component {

    render() {
        return (

            <div className="card card-body mb-3">
                <div class="row">
                    <div className="col-md-4 col-lg-4">                      
                        {
                          this.props.item.links.mission_patch_small &&  <img style={{ height: 80 }} src={this.props.item.links.mission_patch_small} alt="badge" />       
                        }             
                        {
                          !this.props.item.links.mission_patch_small &&  <img style={{ height: 80 }} src="https://via.placeholder.com/250x250?text=UPCOMING" alt="badge" />
                        }
                    </div>
                    <div  className="col-md-8 col-lg-8">
                        <h4><span>{this.props.item.mission_name}</span></h4>
                        <p><Moment format="DD/MM/YYYY HH:mm">{this.props.item.launch_date_local}</Moment> </p>
                        {this.props.item.launch_success &&
                            <p style={{ color: 'green' }}>SUCCESS</p>
                        }
                        {!this.props.item.launch_success && !this.props.item.upcoming && 
                            <p style={{ color: 'red' }}>FAIL</p>
                        }
                        {
                          this.props.item.upcoming && <p style={{ color: 'orange' }}>UPCOMING</p>
                        }
                    </div>
                </div>
                <div className="mt-3">
                    <Link to={`/details/${this.props.item.flight_number}`} className="btn btn-primary">Details</Link>
                </div>
            </div>

        );
    }
}

export default LaunchItem;