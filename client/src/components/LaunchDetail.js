import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Gallery from 'react-grid-gallery';

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number: Int!){
    launch(flight_number:$flight_number) {
        flight_number
        mission_name
        launch_year
        launch_date_local
        launch_success
       rocket {
         rocket_id
         rocket_name
         rocket_type
       }
       links {
         mission_patch
         mission_patch_small
         article_link
         video_link
         flickr_images
       }
    }
}
`;
class LaunchDetail extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number)
        return (

            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h5 style={{ color: 'white' }}>loading...</h5>
                            if (error) console.log(error)

                            console.log(data.launch);
                            

                            const {
                                mission_name,
                                flight_number,
                                launch_date_local,
                                launch_success,
                                rocket: { rocket_name, rocket_type },
                                links: { video_link, mission_patch_small, article_link, flickr_images }
                            } = data.launch;
                            let videoUrl

                            if (video_link) {
                                videoUrl = video_link.split('v=')[1];
                            }

                            const ImageList = []

                            if(flickr_images.length>0){
                              
                                flickr_images.forEach(imageurl => {
                                    let item = {};
                                    item.src = imageurl;
                                    item.thumbnail = imageurl;
                                    item.thumbnailWidth = 320;
                                    item.thumbnailHeight = 174;
                                    ImageList.push(item)
                                });
                            }                         



                            return (
                                <div>
                                    <h1 style={{ color: 'white' }} className="my-3">
                                        <span style={{ color: 'grey' }}>Mission:</span> {mission_name}
                                        <span>    <img style={{ height: 60 }} src={mission_patch_small} alt="badge" /></span>
                                    </h1>

                                    <ul className="list-group">
                                        <li style={{ color: 'black' }} className="list-group-item">
                                            Flight Number: {flight_number}
                                        </li>
                                        <li style={{ color: 'black' }} className="list-group-item">
                                            Launch Date: <Moment format="DD/MM/YYYY HH:mm">{launch_date_local}</Moment>
                                        </li>
                                        <li style={{ color: 'black' }} className="list-group-item">
                                            Status:  {launch_success &&
                                                <span style={{ color: 'green' }}>SUCCESS</span>
                                            }
                                            {!launch_success &&
                                                <span style={{ color: 'red' }}>FAIL</span>
                                            }
                                        </li>
                                    </ul>

                                    <h4 style={{ color: 'grey' }} className="my-3">Rocket Details</h4>
                                    <ul className="list-group">
                                        <li style={{ color: 'black' }} className="list-group-item">
                                            Rocket Name: {rocket_name}
                                        </li>
                                        <li style={{ color: 'black' }} className="list-group-item">
                                            Rocket Type: {rocket_type}
                                        </li>
                                    </ul>

                                    {
                                        (videoUrl || article_link) && <h4 style={{ color: 'grey' }} className="my-3">Launch Media</h4>

                                    }
                                    <ul className="list-group">
                                        {
                                            videoUrl && <YouTube className="mt-3" video={videoUrl} autoplay="0" rel="0" modest="1" />
                                        }
                                        {
                                            article_link && <a className="btn btn-info" rel="noopener noreferrer" href={article_link} target="_blank" >More</a>
                                        }
                                    </ul>

                                    {
                                        flickr_images.length > 0 && <h4 style={{ color: 'grey' }} className="my-3">Images</h4>
                                    }

                                    <ul className="list-group">
                                        <Gallery images={ImageList} />
                                    </ul>

                                    <Link to="/" className="btn btn-warning mt-5"> Back </Link>

                                </div>
                            );
                        }
                    }
                </Query>
            </Fragment>
        );
    }
}

class YouTube extends Component {
    render() {
        var videoSrc = "https://www.youtube.com/embed/" +
            this.props.video + "?autoplay=" +
            this.props.autoplay + "&rel=" +
            this.props.rel;
        return (
            <div >
                <iframe className="player" type="text/html" width="100%" height="500" src={videoSrc} frameBorder="0" />
            </div>
        );
    }
};

export default LaunchDetail;