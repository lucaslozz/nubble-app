import {MutateOptions, useMutation} from '@infra';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options?: MutateOptions<PostComment>,
) {
  const {mutate, error, loading} = useMutation<{message: string}, PostComment>(
    ({message}) => postCommentService.create(postId, message),
    options,
  );

  async function createComment(message: string) {
    await mutate({message});
  }

  return {
    createComment,
    loading,
    error,
  };
}
