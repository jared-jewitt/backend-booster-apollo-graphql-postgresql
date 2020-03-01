import { authGuard } from '../../../../graphql/utils';

describe('guards - unit', () => {

  describe('`authGuard` function' , () => {

    it('throws authentication error', () => {
      const mockNext = jest.fn();
      const mockRoot = {};
      const mockArgs = {};
      const mockContext = {};
      const mockInfo = {};

      try {
        authGuard(mockNext)(mockRoot, mockArgs, mockContext, mockInfo);
      } catch (e) {
        expect(e.message).toBe('Not authenticated');
      }
    });

    it('calls `next` function', () => {
      const mockNext = jest.fn();
      const mockRoot = {};
      const mockArgs = {};
      const mockContext = { user: 'Foo Bar' };
      const mockInfo = {};

      authGuard(mockNext)(mockRoot, mockArgs, mockContext, mockInfo);

      expect(mockNext).toBeCalledWith(mockRoot, mockArgs, mockContext, mockInfo);
    });

  });

});
