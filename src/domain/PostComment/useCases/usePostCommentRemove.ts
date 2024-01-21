import {MutateOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postCommentService} from '../postCommentService';

export function usePostCommentRemove(
  postId: number,
  options?: MutateOptions<string>,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation<string, unknown, {postCommentId: number}>({
    mutationFn: variables => postCommentService.remove(variables.postCommentId),
    onSuccess: message => {
      queryClient.invalidateQueries([QueryKeys.PostCommentList, postId]);
      queryClient.invalidateQueries([QueryKeys.PostList]);
      if (options?.onSuccess) {
        options.onSuccess(message);
      }
    },
  });
  return {mutate: mutation.mutate};
}
// export function usePostCommentRemove(options?: MutateOptions<string>) {
//   return useMutation<{postCommentId: number}, string>(
//     ({postCommentId}) => postCommentService.remove(postCommentId),
//     options,
//   );
// }
