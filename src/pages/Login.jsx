import { Container, Box, Heading, VStack } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Login = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading as="h1" size="lg">Login</Heading>
          <SupabaseAuthUI />
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;