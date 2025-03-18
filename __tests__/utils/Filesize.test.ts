import humanFileSize from '../../utils/Filesize';

describe('humanFileSize', () => {
  it('should format bytes correctly', () => {
    expect(humanFileSize(0)).toBe('0 B');
    expect(humanFileSize(500)).toBe('500 B');
  });

  it('should format kilobytes correctly', () => {
    expect(humanFileSize(1024)).toBe('1.0 KB');
    expect(humanFileSize(1536)).toBe('1.5 KB');
  });

  it('should format megabytes correctly', () => {
    expect(humanFileSize(1048576)).toBe('1.0 MB');
    expect(humanFileSize(2097152)).toBe('2.0 MB');
  });

  it('should format gigabytes correctly', () => {
    expect(humanFileSize(1073741824)).toBe('1.0 GB');
    expect(humanFileSize(1610612736)).toBe('1.5 GB');
  });

  it('should format terabytes correctly', () => {
    expect(humanFileSize(1099511627776)).toBe('1.0 TB');
    expect(humanFileSize(1649267441664)).toBe('1.5 TB');
  });

  it('should handle invalid inputs', () => {
    expect(humanFileSize(-1)).toBe('-1 B');
    expect(humanFileSize(NaN)).toBe('NaN KB');
  });
});
