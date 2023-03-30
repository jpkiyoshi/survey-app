import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';

export default function App({
	Component,
	pageProps,
}: AppProps<{ initialSession: Session }>) {
	const [supabase] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionContextProvider>
	);
}
