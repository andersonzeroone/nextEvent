import EventSummary from '../../components/event-detail/event-summary';
import { getEventById, getAllEvents } from '../../helpers/api-util';

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
  const events = await getAllEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));


  return {
    paths: paths,
    fallback: false
  }
}

export default EventsDetailPage;