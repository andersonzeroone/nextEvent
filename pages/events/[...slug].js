import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import ResultTitle from '../../components/events/results-title';
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";

import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {

  const router = useRouter();

  const filterData = router.query.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {


    <>
      <ErrorAlert className="center">Invalid filter please adjust your values!</ErrorAlert>
      <div className="center">
        <Button link='/events' >Show all events</Button>
      </div>

    </>

  }

  if (!filterData) {

    <>
      <ErrorAlert className="center">Loading....</ErrorAlert>
      <div className="center">
        <Button link='/events' >Show all events</Button>
      </div>

    </>
  }


  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });


  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert >No events found for the chosen filter!</ErrorAlert>
        <div className="center">
          <Button link='/events' >Show all events</Button>
        </div>

      </>
    )
  }


  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList item={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage;