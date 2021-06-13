import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards = [] }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imageUrl, setImageUrl] = useState<string>();

  const handleViewImage = useCallback(
    (url: string) => {
      setImageUrl(url);
      onOpen();
    },
    [onOpen, setImageUrl]
  );

  return (
    <>
      <SimpleGrid templateColumns="repeat(3, 1fr)" gap="2.5rem">
        {cards?.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
    </>
  );
}
