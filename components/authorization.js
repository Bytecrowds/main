import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { authorize } from "../server-functions/authorization";
import StyledText from "./styled/text";

const AuthorizationModal = ({ isOpen, onClose, id }) => {
  const inputRef = useRef(null);

  /*
    Try to call the authorization endpoint with the given emails,
    and alert the user if a non-200 status code is returned. 
  */
  const submit = async () => {
    const emails = inputRef.current.value.replaceAll(" ", "").split(",");

    // Regex from https://www.scaler.com/topics/email-validation-in-javascript/
    for (const email of emails)
      if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        alert(`invalid email: ${email}`);
        return;
      }

    let response = await authorize(id, emails);

    if (response.status !== 200) {
      alert(await response.text());
      return;
    }

    // Close the modal.
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="5px" />
      <ModalContent>
        <ModalHeader>
          Type the email addresses you want to authorize separated with a comma
        </ModalHeader>
        <ModalBody>
          <Input
            ref={inputRef}
            placeholder="email addresses"
            _placeholder={{
              opacity: 2,
              background: "brand",
              backgroundClip: "text",
              fill: "transparent",
            }}
          />
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={submit}>
            <StyledText>submit</StyledText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthorizationModal;
