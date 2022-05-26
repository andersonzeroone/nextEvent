import { getFeaturedEvents } from './../helpers/api-util'
import EventList from '../components/events/event-list';
import Head from 'next/head';


function HomePage(props) {

  const { events } = props;

  return (
    <div>
      <Head>
        <title>NextJs events</title>
        <meta
          name='description'
          content='find a lot of great events'
        />
      </Head>
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 600
  }
}

export default HomePage;