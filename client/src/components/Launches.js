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
               <h3 style={{color:'white'}} className="my-3">Launches</h3>
               <Query query={LAUNCHES_QUERY}>
               {
                  ({loading,error,data})=>{
                    if(loading) return <h5 style={{color:'white'}}>loading...</h5>
                    if(error) console.log(error)
                    return <Fragment>
                        {
                            data.launches.map(launchitem=>(
                                <LaunchItem key={launchitem.flight_number} item={launchitem}/>
                            ))
                        }
                    </Fragment> 
                  }
               }
               </Query>
            </Fragment>
        );
    }
}

export default Launches;
