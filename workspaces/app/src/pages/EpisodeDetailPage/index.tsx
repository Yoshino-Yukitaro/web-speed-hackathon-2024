import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import type { GetEpisodeListResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeListResponse';

import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';


const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  const [episodeList, setEpisodeList] = useState<GetEpisodeListResponse>([]);
  invariant(bookId);
  invariant(episodeId);

  useEffect(() => {
      setEpisodeList(JSON.parse(document.getElementById('inject-data')!.innerHTML).episodeList);
  }, [])

  return (
    episodeList ? (
      <Box>
      <section aria-label="漫画ビューアー" >
        <ComicViewer episode={episodeList.find((episode) => episode.id === episodeId)!} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {
            (episodeList) ? (
              episodeList.map((episode) => (
                <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
              ))
            ) : (
              [1, 2, 3].map((index) => {
                return <Box key={index} as="div" height="96px" width="100%"> </Box>
              })
            )
          }
        </Flex>
      </Box>
    </Box>
  ) : (<></>)
    )
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
