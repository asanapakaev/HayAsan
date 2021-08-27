import React from 'react';
import LoadingComponent from "../components/LoadingComponent";
import requester from "../utils/requester";
import {getFileUrl} from "../utils";
import ReactStars from "react-stars";

class MovieViewContainer extends React.Component {
  state = {
    loading: false,
    item: null,
  }

  componentDidMount() {
    this.setState({loading: true});
    requester.get(`/movie/${this.props.match.params.id}`).then((res) => {
      console.log(res);
      this.setState({item: res})
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingComponent/>;
    }

    const {item} = this.state;

    if (!item) return null;

    return (
      <>
        <div className={'position-relative d-none d-md-block'}>
          <img width={'100%'} src={getFileUrl(item.backdrop_path, 'original')}/>
          <div style={{bottom: -70, left: 50,}} className={'position-absolute'}>
            <img style={{border: '1px solid white'}}
                 className={'shadow-lg rounded mb-3'} width={200} src={getFileUrl(item.poster_path)}/>
            <ReactStars
              count={10}
              value={item.vote_average}
              size={20}
              edit={false}
              color2={'#ffd700'}/>
          </div>
          <h1 style={{bottom: 10, left: 280, textShadow: '0px 0px 5px 5px #eee'}}
              className={'position-absolute text-light'}>
            {item.title}
            {item.tagline && <h5 className={'mt-2'}>{item.tagline}</h5>}
          </h1>
          <h4 style={{bottom: -50, left: 280}}
              className={'position-absolute'}>{item.genres.map(v => v.name).join(', ')}</h4>
        </div>
        <div className={'d-flex justify-content-center align-items-center flex-column d-md-none'}>
          <img className={'w-100 mb-4'} src={getFileUrl(item.poster_path)}/>
          <ReactStars
            count={10}
            value={item.vote_average}
            size={20}
            edit={false}
            color2={'#ffd700'}
          />
          <h1>
            {item.title}
            {item.tagline && <h5 className={'mt-2'}>{item.tagline}</h5>}
          </h1>
          <h4>{item.genres.map(v => v.name).join(', ')}</h4>
        </div>
        <div className={'d-block d-md-none mt-3'}>{item.overview}</div>
        <div className={'d-none d-md-block'} style={{marginTop: 100}}>{item.overview}</div>
      </>
    );
  }
}

export default MovieViewContainer;
