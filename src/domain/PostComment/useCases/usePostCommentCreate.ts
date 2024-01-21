import {MutateOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options?: MutateOptions<PostComment>,
) {
  const queryClient = useQueryClient();

  const {mutate, isError, isLoading} = useMutation<
    PostComment,
    unknown,
    {message: string}
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),
    onSuccess: data => {
      queryClient.invalidateQueries([QueryKeys.PostCommentList, postId]);
      queryClient.invalidateQueries([QueryKeys.PostList]);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Ocorreu um erro.');
      }
    },
  });

  function createComment(message: string) {
    mutate({message});
  }

  return {
    createComment,
    isError,
    isLoading,
  };
}

// export function usePostCommentCreate(
//   postId: number,
//   options?: MutateOptions<PostComment>,
// ) {
//   const {mutate, error, loading} = useMutation<{message: string}, PostComment>(
//     ({message}) => postCommentService.create(postId, message),
//     options,
//   );

//   async function createComment(message: string) {
//     await mutate({message});
//   }

//   return {
//     createComment,
//     loading,
//     error,
//   };
// }
