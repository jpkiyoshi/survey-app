import { supabase } from '@/lib/supabaseClient';
import NextLink from 'next/link';
import {
	Button,
	Link,
	Heading,
	VStack,
	Box,
	useRadio,
	UseRadioProps,
	useRadioGroup,
	Text,
} from '@chakra-ui/react';

import { FormEvent, useState } from 'react';

type SurveyProps = {
	data: {
		surveys: {
			author_id: string | null;
			created_at: string | null;
			description: string | null;
			id: number;
			title: string;
		}[];
		profiles: {
			avatar_url: string | null;
			full_name: string | null;
			id: string;
			updated_at: string | null;
			username: string | null;
			website: string | null;
		}[];
		surveyOptions: {
			created_at: string | null;
			id: number;
			option_name: string;
			survey_id: number;
		}[];
	};
};

interface RadioCardProps extends UseRadioProps {
	children: React.ReactNode;
}

function RadioCard(props: RadioCardProps) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
			>
				{props.children}
			</Box>
		</Box>
	);
}

const Survey = ({ data }: SurveyProps) => {
	const { profiles, surveyOptions, surveys } = data;

	const [answerId, setAnswerId] = useState('');
	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'surveys',
		onChange: setAnswerId,
	});

	const group = getRootProps();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!answerId || typeof answerId !== 'string') {
			console.error('Resposta inválida.');
			return;
		}

		const vote = {
			survey_id: 13,
			voter_id: '04b6f2df-7684-4d15-9e92-9eea37fa36a2',
			survey_options_id: Number(answerId),
		};

		const { data, error } = await supabase.from('survey_votes').insert(vote);

		if (error) {
			console.error(error);
			return;
		}

		setAnswerId('');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<VStack>
					<Heading as='h1' size='xl'>
						{surveys[3].title}
					</Heading>
					<p>{surveys[3].description}</p>
					<Text fontSize={'sm'}>By: {profiles[1].full_name}</Text>
					<VStack {...group}>
						{surveyOptions
							.filter(option => option.survey_id === 13)
							.map(option => {
								const radio = getRadioProps({ value: option.id });
								return (
									<RadioCard key={option.id} {...radio}>
										{option.option_name}
									</RadioCard>
								);
							})}
					</VStack>
					<br />
					<Button type='submit'>Enviar</Button>
				</VStack>
			</form>
			<Link as={NextLink} href='/'>
				<Button>Voltar para criação de enquete</Button>
			</Link>
		</>
	);
};

export default Survey;
