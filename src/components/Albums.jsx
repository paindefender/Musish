import React, {Fragment} from 'react';

import AlbumItem from './AlbumItem';

import AlbumScss from './Albums.scss';
import PageTitle from "./PageTitle";
import PaginatedResults from './PaginatedResults';
import MainPaginatedResults from './MainPaginatedResults';

export default class Albums extends React.Component {
  async load(params) {
    const music = MusicKit.getInstance();

    return await music.api.library.albums(null, params);
  }

  renderItems(items, more, {loading, end}) {
    if (!items) {
      return 'Loading...';
    }

    const albums = items.map(
        (album, i) => {
          const WHEIGHT = 150;
          let url = MusicKit.formatArtworkURL(album.attributes.artwork, WHEIGHT, WHEIGHT);

          return (
              <div key={i}>
                <AlbumItem url={url} id={album.id} title={album.attributes.name} name={album.attributes.artistName}/>
              </div>
          );
        });

    return (
        <MainPaginatedResults more={more}>
          <PageTitle title={"Albums"} context={"Your Library"} />
          <div className={AlbumScss.container}>
            { albums }
          </div>
          {loading && "Loading..."}
        </MainPaginatedResults>
    )
  }

  render() {
    return <PaginatedResults load={this.load} render={this.renderItems}/>;
  }
}
