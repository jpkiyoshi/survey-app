import Survey from '@/components/Survey';
import { supabase } from '@/lib/supabaseClient';
import { GetServerSideProps } from 'next';

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

const ShowSurveys = ({ data }: Props) => {
	return <Survey data={data} />;
};
export default ShowSurveys;

export const getServerSideProps: GetServerSideProps = async context => {
	let { data: surveys } = await supabase.from('surveys').select('*');
	let { data: surveyOptions } = await supabase.from('survey_options').select('*');
	let { data: profiles } = await supabase.from('profiles').select('*');

	return {
		props: {
			data: {
				surveys,
				surveyOptions,
				profiles,
			},
		},
	};
};
