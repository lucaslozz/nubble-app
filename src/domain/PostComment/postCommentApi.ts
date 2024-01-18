import {PageAPI, PageParams, api} from '@api';

import {PostCommentAPI} from './postCommentTypes';

const PATH = 'user/post_comment/';

async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PageAPI<PostCommentAPI>> {
  const {data} = await api.get<PageAPI<PostCommentAPI>>(PATH, {
    params: {post_id, ...pageParams},
  });

  return data;
}

async function create(
  post_id: number,
  message: string,
): Promise<PostCommentAPI> {
  const {data} = await api.post<PostCommentAPI>(PATH, {
    post_id,
    message,
  });

  return data;
}

async function remove(postCommentId: number): Promise<{message: string}> {
  const response = await api.delete<{message: string}>(
    `${PATH}${postCommentId}`,
  );

  return response.data;
}

export const postCommentApi = {
  getList,
  create,
  remove,
};
