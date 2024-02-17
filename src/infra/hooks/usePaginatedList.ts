import {useEffect, useState} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {Page} from '@types';

export interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

interface PaginatedListOption {
  /**
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   */
  enabled?: boolean;
  /**
   * The time in milliseconds after data is considered stale.
   */
  staleTime?: number;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
  options?: PaginatedListOption,
): UsePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({pageParam = 1}) => getList(pageParam),
    getNextPageParam: ({meta}) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.flatMap(page => page.data);

      setList(newList);
    }
  }, [query.data]);

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    list,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}

// export function usePaginatedList<Data>(
//   getList: (page: number) => Promise<Page<Data>>,
// ): UsePaginatedListResult<Data> {
//   const [list, setList] = useState<Data[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<unknown>(null);
//   const [page, setPage] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(true);

//   async function fetchInitialData() {
//     try {
//       setError(null);
//       setLoading(true);
//       const {data, meta} = await getList(1);
//       setList(data);
//       if (meta.hasNextPage) {
//         setPage(2);
//         setHasNextPage(true);
//       } else {
//         setHasNextPage(false);
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function fetchNextPage() {
//     if (loading || !hasNextPage) {
//       return;
//     }

//     try {
//       setLoading(true);
//       const {data, meta} = await getList(page);
//       setList(prev => [...prev, ...data]);
//       if (meta.hasNextPage) {
//         setPage(prev => prev + 1);
//       } else {
//         setHasNextPage(false);
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   useEffect(() => {
//     fetchInitialData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return {
//     isLoading: loading,
//     isError: error,
//     list,
//     refresh: fetchInitialData,
//     fetchNextPage,
//     hasNextPage,
//   };
// }
