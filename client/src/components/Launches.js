import React, { Component ,Fragment} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo'
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
query LaunchesQuery{
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      upcoming
      links {
        mission_patch_small
      }
    }
}
`;

class Launches extends Component {
    render() {
        return (
            <Fragment>
               <Query query={LAUNCHES_QUERY}>
               {
                  ({loading,error,data})=>{
                    if(loading) return <h5 style={{color:'white'}}>loading...</h5>
                    if(error) console.log(error)
                    return <div className="row mt-5">
                        {
                            data.launches.map(launchitem=>(
                                <div className="col-md-4 col-lg-4">
                                <LaunchItem  key={launchitem.flight_number} item={launchitem}/>
                                </div>
                            ))
                        }
                    </div> 
                  }
               }
               </Query>
            </Fragment>
        );
    }
}

export default Launches;
