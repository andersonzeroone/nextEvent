import EventSummary from '../../components/event-detail/event-summary';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-util';
import Head from 'next/head';

import EventLogistics from '../../components/event-detail/event-logistics';

import EventContent from '../../components/event-detail/event-content';

import ErrorAlert from '../../components/ui/error-alert'

function EventsDetailPage(props) {

  const event = props.selectedEvent;

  if (!event) {
    return <ErrorAlert>Not found Event!</ErrorAlert>
  }
  return (
    <>

      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content='find a lot of great events'
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />

      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export async function getStaticProps(context) {

  const eventId = context.params.eventId;

  console.log(eventId)

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));


  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventsDetailPage;