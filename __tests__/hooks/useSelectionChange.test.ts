import { renderHook } from '@testing-library/react-hooks';
import useSelectionChange from '../../hooks/useSelectionChange';
import { fileItem } from '../../types';

describe('useSelectionChange', () => {
  const mockFiles: fileItem[] = [
    {
      name: 'file1.txt',
      uri: 'file:///test/file1.txt',
      size: 1024,
      modificationTime: 1234567890,
      isDirectory: false,
      selected: false,
      exists: true
    },
    {
      name: 'file2.jpg',
      uri: 'file:///test/file2.jpg',
      size: 2048,
      modificationTime: 1234567891,
      isDirectory: false,
      selected: false,
      exists: true
    },
  ];

  it('should initialize with multiSelect false and allSelected false', () => {
    const { result } = renderHook(() => useSelectionChange([]));
    expect(result.current.multiSelect).toBe(false);
    expect(result.current.allSelected).toBe(false);
  });

  it('should update multiSelect when files are selected', () => {
    const selectedFiles = [...mockFiles];
    selectedFiles[0].selected = true;

    const { result } = renderHook(() => useSelectionChange(selectedFiles));
    expect(result.current.multiSelect).toBe(true);
  });

  it('should set allSelected to true when all files are selected', () => {
    const selectedFiles = mockFiles.map(file => ({
      ...file,
      selected: true,
    }));

    const { result } = renderHook(() => useSelectionChange(selectedFiles));
    expect(result.current.allSelected).toBe(true);
  });

  it('should set allSelected to false when some files are not selected', () => {
    const partiallySelectedFiles = [...mockFiles];
    partiallySelectedFiles[0].selected = true;

    const { result } = renderHook(() => useSelectionChange(partiallySelectedFiles));
    expect(result.current.allSelected).toBe(false);
  });

  it('should handle empty files array', () => {
    const { result } = renderHook(() => useSelectionChange([]));
    expect(result.current.multiSelect).toBe(false);
    expect(result.current.allSelected).toBe(false);
  });

  it('should update when files array changes', () => {
    const { result, rerender } = renderHook(
      ({ files }) => useSelectionChange(files),
      { initialProps: { files: mockFiles } }
    );

    // Initially no files selected
    expect(result.current.multiSelect).toBe(true);
    expect(result.current.allSelected).toBe(false);

    // Update with some files selected
    const updatedFiles = mockFiles.map(file => ({
      ...file,
      selected: true,
    }));

    rerender({ files: updatedFiles });

    expect(result.current.multiSelect).toBe(true);
    expect(result.current.allSelected).toBe(true);
  });
});
