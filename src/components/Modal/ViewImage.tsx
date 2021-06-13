import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width="auto"
        height="auto"
        maxHeight="600px"
        maxWidth="900px"
      >
        <ModalBody
          overflow="hidden"
          display="flex"
          justifyContent="center"
          padding="0"
        >
          <Image src={imgUrl} maxHeight="600px" maxWidth="900px" />
        </ModalBody>

        <ModalFooter
          display="flex"
          justifyContent="start"
          alignItems="center"
          background="gray.800"
          height="2rem"
        >
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
