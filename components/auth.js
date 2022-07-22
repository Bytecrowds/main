import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Button,
} from "@chakra-ui/react";

const Auth = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay backdropBlur="50px" />
      <ModalContent>
        <ModalHeader>Please log in to acces this bytecrowd</ModalHeader>
        <ModalBody>
          <Input
            placeholder="name"
            _placeholder={{ opacity: 2, color: "#18db87" }}
          ></Input>
          <Input
            marginTop="20px"
            placeholder="password"
            _placeholder={{ opacity: 2, color: "#18db87" }}
          ></Input>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button color="#18db87" variant="outline">
            log in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Auth;
