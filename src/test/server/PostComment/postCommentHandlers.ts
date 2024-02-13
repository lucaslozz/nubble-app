import {BASE_URL, PageAPI} from '@api';
import {POST_COMMENT_PATH, PostCommentAPI} from '@domain';
import {http, HttpResponse} from 'msw';

import {mockedData} from './mocks';

const inMemoryResponse = {...mockedData.mockedPostCommentResponse};

const FULL_URL = BASE_URL + POST_COMMENT_PATH;
export const postCommentHandlers = [
  http.get(FULL_URL, async () => {
    const response: PageAPI<PostCommentAPI> =
      mockedData.mockedPostCommentResponse;

    return HttpResponse.json(response, {status: 200});
  }),

  http.post<any, {post_id: number; message: string}>(
    FULL_URL,
    async ({request}) => {
      const body = await request.json();

      const newPostCommentAPI: PostCommentAPI = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message,
      };

      const response: PageAPI<PostCommentAPI> = {
        data: [newPostCommentAPI, ...inMemoryResponse.data],
        meta: {
          ...inMemoryResponse.meta,
          total: inMemoryResponse.meta.total + 1,
        },
      };
      return HttpResponse.json(response, {status: 200});
    },
  ),
];
