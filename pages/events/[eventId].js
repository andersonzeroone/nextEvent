import { useRouter } from "next/router";
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummy-data';

import EventLogistics from '../../components/event-detail/event-logistics';

import EventContent from '../../components/event-detail/event-content';

function EventsDetailPage() {

  const router = useRouter();

  const eventId = router.query.eventId;

  const event = getEventById(eventId);

  console.log(router.query)


  if (!event) {
    return <p>Not found Event!</p>
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

export default EventsDetailPage;