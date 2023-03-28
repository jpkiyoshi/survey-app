import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
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

type TotalVotes = {
	[key: string]: number;
};

const Survey = ({ data }: Props) => {
	const { profiles, surveyOptions, surveys } = data;

	const [answer, setAnswer] = useState('');
	const [selectedVoteId, setSelectedVoteId] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value);
		setSelectedVoteId(Number(e.target.id));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!answer || typeof answer !== 'string') {
			console.error('Answer is not defined or is not a string');
			return;
		}

		const vote = {
			survey_id: 11,
			voter_id: '04b6f2df-7684-4d15-9e92-9eea37fa36a2',
			survey_options_id: selectedVoteId,
		};

		const { data, error } = await supabase.from('survey_votes').insert(vote);

		if (error) {
			console.error(error);
			return;
		}

		setAnswer('');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1>{surveys[1].title}</h1>
				<p>{surveys[1].description}</p>
				<p>{profiles[1].full_name}</p>
				{surveyOptions
					.filter(option => option.survey_id === 11)
					.map(option => (
						<label key={option.id}>
							<input
								id={`${option.id}`}
								type='radio'
								name='survey'
								value={option.option_name}
								onChange={handleChange}
								checked={answer === option.option_name}
							/>
							{option.option_name}
						</label>
					))}
				<br />
				<button type='submit'>Enviar</button>
			</form>
			<br />
			<div>Opção selecionada: {answer}</div>
			<br />
			<Link href='/'>Voltar para criação de enquete</Link>
		</>
	);
};

export default Survey;
