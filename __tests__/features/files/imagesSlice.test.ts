/// <reference types="jest" />
import imagesReducer, { setImages } from '../../../features/files/imagesSlice';
import { FileInfo } from 'expo-file-system';

describe('images slice', () => {
  const initialState = {
    images: [],
  };

  it('should handle initial state', () => {
    expect(imagesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setImages', () => {
    const mockImages: FileInfo[] = [
      {
        uri: 'file:///test/image1.jpg',
        size: 1024,
        modificationTime: 1234567890,
        exists: true,
        isDirectory: false,
      },
      {
        uri: 'file:///test/image2.jpg',
        size: 2048,
        modificationTime: 1234567891,
        exists: true,
        isDirectory: false,
      },
    ];

    const actual = imagesReducer(initialState, setImages(mockImages));
    expect(actual.images).toEqual(mockImages);
  });
});
