import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type RequestParam = {
  pageParam?: string;
};

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ResponseData = {
  data: Image[];
  after: string;
};

const fetchImages = async ({
  pageParam = null,
}: RequestParam): Promise<ResponseData> => {
  const { data } = await api.get<ResponseData>('/api/images', {
    params: {
      after: pageParam,
    },
  });

  return data;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.after ?? null;
    },
  });

  const formattedData = useMemo(() => {
    let images = [];
    (data?.pages || []).map(page => {
      images = [...images, ...page.data];
      return page.data;
    });
    return images;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            role="button"
            background="orange.500"
            color="gray.50"
            width="8.375rem"
            height="2.5rem"
            onClick={() => fetchNextPage()}
            isLoading={isLoading || isFetchingNextPage}
            marginTop="2rem"
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
