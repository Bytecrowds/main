import { Text } from "@chakra-ui/react";
import { textGradientStyles } from "../../theme";

const StyledText = ({ children, styling }) => {
  return (
    <Text background="brand" style={{ ...textGradientStyles, ...styling }}>
      {children}
    </Text>
  );
};

export default StyledText;
