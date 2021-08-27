import React from 'react';
import ItemsListComponent from "../components/ItemsListComponent";

class HomeContainer extends React.Component {
  render() {
    return (
      <>
        <ItemsListComponent
          payload={{
            buttons: [
              {
                getUrl: (k) => `/tv/${k.id}`,
                label: 'По ТВ',
                value: 'tv',
                url: '/tv/popular',
              },
              {
                getUrl: (k) => `/movie/${k.id}`,
                label: 'В кинотеатрах',
                value: 'movie',
                url: '/movie/popular',
              },
            ],
          }}
          title={'Что популярно'}
        />
        <ItemsListComponent
          payload={{
            buttons: [
              {
                getUrl: (k) => `/movie/${k.id}`,
                getTitle: (k) => k.title,
                label: 'Сегодня',
                value: 'tv',
                url: '/movie/upcoming',
              },
              {
                getUrl: (k) => `/movie/${k.id}`,
                getTitle: (k) => k.title,
                label: 'На этой неделе',
                value: 'movie',
                url: '/movie/top_rated',
              },
            ],
          }}
          title={'Что в тренде'}
        />
      </>
    );
  }
}

export default HomeContainer;
