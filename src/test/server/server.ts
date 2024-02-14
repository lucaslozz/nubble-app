import {setupServer} from 'msw/node';

import {
  postCommentHandlers,
  resetInMemoryResponse,
} from './PostComment/postCommentHandlers';

export const server = setupServer(...postCommentHandlers);

export {resetInMemoryResponse};
