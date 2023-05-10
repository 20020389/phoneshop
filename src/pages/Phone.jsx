import { Box } from '@chakra-ui/react';
import End from '../components/end';
import Header1 from '../components/header1';
import { PhoneSite } from '../components/Phone/PhoneSite';

/**
 *
 * @param {{
 *  user?: User
 * }} param0
 * @returns
 */
export default function PhonePage({ user }) {
  return (
    <Box height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <PhoneSite user={user} />
        <End></End>
      </Box>
    </Box>
  );
}
