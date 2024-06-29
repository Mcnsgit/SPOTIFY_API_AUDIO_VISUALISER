// __tests__/TrackCover.test.jsx

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TrackCover from '../path/to/TrackCover'; // Adjust the path as necessary

describe('TrackCover Component', () => {
  test('renders nothing when currentSong is undefined', () => {
    const { container } = render(<TrackCover currentSong={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when currentSong.album is undefined', () => {
    const { container } = render(<TrackCover currentSong={{}} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when currentSong.album.images is undefined', () => {
    const { container } = render(<TrackCover currentSong={{ album: {} }} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when currentSong.album.images is an empty array', () => {
    const { container } = render(
      <TrackCover currentSong={{ album: { images: [] } }} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders the image when currentSong.album.images[2].url is provided', () => {
    const currentSong = {
      album: {
        images: [
          { url: 'url1' },
          { url: 'url2' },
          { url: 'url3' }
        ]
      }
    };
    const { getByAltText } = render(<TrackCover currentSong={currentSong} />);
    const img = getByAltText('cover');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'url3');
  });

  test('renders nothing when currentSong.album.images[2] is undefined', () => {
    const currentSong = {
      album: {
        images: [
          { url: 'url1' },
          { url: 'url2' }
        ]
      }
    };
    const { container } = render(<TrackCover currentSong={currentSong} />);
    expect(container.firstChild).toBeNull();
  });
});
