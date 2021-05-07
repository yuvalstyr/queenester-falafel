import {
  Input,
  InputProps,
  Text,
  TextProps,
  useBreakpointValue,
} from "@chakra-ui/react";

// TODO change to compound

export type TextLabelProps = React.PropsWithChildren<TextProps>;

export function TextLabel(props: TextLabelProps) {
  return (
    <Text
      position="absolute"
      color="gray.500"
      transform={{ base: "translatey(-2.75em)", md: "translatey(-1.75em)" }}
      transformOrigin="top left"
      transition="all 0.2s ease-out"
      pointerEvents="none"
      textTransform="capitalize"
      ml="2"
      {...props}
    />
  );
}

export type InputWithLabelProps = React.PropsWithChildren<InputProps> & {
  downshiftRef?: React.ForwardedRef<HTMLInputElement>;
};

export function InputWithLabel(props: InputWithLabelProps) {
  const translateY = useBreakpointValue({ base: "-4em", md: "-3em" });
  const { downshiftRef, ...rest } = props;
  return (
    <Input
      transition="all 0.5s ease-out"
      borderColor="blackAlpha.100"
      fontSize="inherit"
      _placeholder={{
        color: "transparent",
      }}
      sx={{
        ":focus + p": {
          transform: `translateY(${translateY}) scale(0.8)`,
          color: "gray.500",
        },
        ":not(:placeholder-shown) + p": {
          transform: `translateY(${translateY}) scale(0.8)`,
          color: "gray.500",
        },
      }}
      {...rest}
      ref={downshiftRef}
    />
  );
}
