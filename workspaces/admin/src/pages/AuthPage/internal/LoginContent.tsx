import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useLogin } from '../../../features/auth/hooks/useLogin';

export const LoginContent: React.FC = () => {
  const login = useLogin();
  const loginContentA11yId = useId();

  interface FormValues {
    email: string;
    password: string;
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('メールアドレスを入力してください')
      .test({
        message: 'メールアドレスには @ を含めてください',
        test: (v) => /^(?:[^@]*){12,}$/v.test(v) === false,
      }),
    password: yup
      .string()
      .required('パスワードを入力してください')
      .test({
        message: 'パスワードには記号を含めてください',
        test: (v) => /^(?:[^\P{Letter}&&\P{Number}]*){24,}$/v.test(v) === false,
      }),
  });

  const { formState: { errors }, handleSubmit, register } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async(value :FormValues) => {
    value as FormValues;
    login.mutate({ email: value.email, password: value.password });
  }

  return (
    <Box
      aria-labelledby={loginContentA11yId}
      as="form"
      bg="gray.100"
      borderRadius={8}
      onSubmit={handleSubmit(onSubmit)}
      p={6}
      w="100%"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="xl" fontWeight="bold" id={loginContentA11yId}>
          ログイン
        </Heading>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            placeholder="メールアドレス"
            {...register('email')}
          />
          <FormErrorMessage role="alert">{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>パスワード</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            {...register('password')}
            placeholder="パスワード"
            type="password"
          />
          <FormErrorMessage role="alert">{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Spacer />

        <Button colorScheme="teal" type="submit" variant="solid">
          ログイン
        </Button>
      </Stack>
    </Box>
  );
};
