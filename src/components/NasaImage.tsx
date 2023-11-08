import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
const api_key = import.meta.env.VITE_API_KEY;

interface AppProps {
  date: string;
}

interface ImageData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

async function fetchImageData({ queryKey }: QueryFunctionContext): Promise<ImageData> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, date] = queryKey;
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`
  );
  return response.json();
}

const NasaImage = (props: AppProps) => {
  const date = props.date;
  const query = useQuery({
    queryKey: ['image', date],
    queryFn: fetchImageData,
  });

  if (query.isError) return <p>There was an error retrieving the image.</p>;

  return query.isFetched && !query.isLoading ? (
    <>
      <h2 className='title'>{query.data.title}</h2>
      {query.data.media_type === 'video' && (
        <iframe title='space-video' src={query.data.url} allowFullScreen className='video'></iframe>
      )}
      {query.data.media_type === 'image' && (
        <img src={query.data.hdurl} alt={query.data.explanation} />
      )}
      <div className='explanation-container'>
        <p className='explanation'>{query.data.explanation}</p>
        <small>Copyright: {query.data.copyright}</small>
      </div>
    </>
  ) : (
    <h1 className='loading'>🌀</h1>
  );
};

export default NasaImage;
