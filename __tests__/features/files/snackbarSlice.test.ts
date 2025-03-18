import snackbarReducer, {
  setSnack,
  hideSnack,
} from '../../../features/files/snackbarSlice';

describe('snackbar slice', () => {
  const initialState = {
    isVisible: false,
    message: '',
    label: null,
  };

  it('should handle initial state', () => {
    expect(snackbarReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSnack with message only', () => {
    const testMessage = 'Test message';
    const actual = snackbarReducer(
      initialState,
      setSnack({ message: testMessage })
    );
    expect(actual).toEqual({
      isVisible: true,
      message: testMessage,
    });
  });

  it('should handle setSnack with message and label', () => {
    const testMessage = 'Test message';
    const testLabel = 'Test label';
    const actual = snackbarReducer(
      initialState,
      setSnack({ message: testMessage, label: testLabel })
    );
    expect(actual).toEqual({
      isVisible: true,
      message: testMessage,
      label: testLabel,
    });
  });

  it('should handle hideSnack', () => {
    const stateWithSnack = {
      isVisible: true,
      message: 'Test message',
      label: 'Test label',
    };
    const actual = snackbarReducer(stateWithSnack, hideSnack());
    expect(actual).toEqual({
      ...initialState,
      isVisible: false,
    });
  });
});
