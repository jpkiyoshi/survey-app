import { supabase } from '@/lib/supabaseClient';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
	surveyOptions: string[];
	handleSurveyOptions: (options: string[]) => void;
};

const Option = ({
	index,
	value,
	handleChange,
}: {
	index: number;
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
	<div key={index}>
		<label htmlFor={`option${index + 1}`}>Opção {index + 1}</label>
		<input
			type='text'
			name={`option${index + 1}`}
			id={`option${index + 1}`}
			value={value}
			onChange={handleChange}
		/>
	</div>
);

const Title = ({
	title,
	handleTitle,
}: {
	title: string;
	handleTitle: (value: string) => void;
}) => {
	return (
		<div>
			<label htmlFor='title'>Título</label>
			<input
				type='text'
				name='title'
				id='title'
				value={title}
				onChange={e => handleTitle(e.target.value)}
			/>
		</div>
	);
};

const CreateSurvey = ({ surveyOptions, handleSurveyOptions }: Props) => {
	const [title, setTitle] = useState('');

	const handleTitle = (newTitle: string) => {
		setTitle(newTitle);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		const index = Number(id.replace('option', '')) - 1;
		const newOptions = [...surveyOptions];
		newOptions[index] = value;
		handleSurveyOptions(newOptions);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const target = e.target as HTMLFormElement;
		const optionsArr = Array.from(target.elements) as HTMLInputElement[];
		const filteredOptions = optionsArr.filter(
			option =>
				option.type !== 'button' &&
				option.type !== 'submit' &&
				option.name.startsWith('option')
		);

		const optionsValues = filteredOptions.map(option => option.value);
		handleSurveyOptions(optionsValues);

		const { data: surveys, error } = await supabase
			.from('surveys')
			.insert({ title })
			.select();
		4;

		if (error) {
			console.error(error);
			return;
		}

		for (let i = 0; i < surveyOptions.length; i++) {
			const { data: options, error: optionsError } = await supabase
				.from('survey_options')
				.insert([{ option_name: surveyOptions[i], survey_id: surveys[0].id }]);

			if (optionsError) {
				console.error(optionsError);
				return;
			}
		}
	};

	const addOption = () => {
		const newOptionName = `Opção ${surveyOptions.length + 1}`;
		handleSurveyOptions([...surveyOptions, newOptionName]);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Title title={title} handleTitle={handleTitle} />
				{surveyOptions.map((option, index) => (
					<Option
						key={index}
						index={index}
						value={option}
						handleChange={handleChange}
					/>
				))}
				<br />
				<button type='button' onClick={addOption}>
					Adicionar opção
				</button>
				<br />
				<br />
				<br />
				<button type='submit'>Criar enquete</button>
			</form>
		</>
	);
};

export default CreateSurvey;
