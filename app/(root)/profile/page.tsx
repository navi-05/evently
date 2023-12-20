import Link from "next/link"
import { auth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import Collection from "@/components/shared/collection"

import { getEventsByUser } from "@/lib/actions/event.actions"

const ProfilePage = async () => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ 
    userId,
    page: 1
  })

  return (
    <>
      {/* MY TICKETS */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            My tickets
          </h3>
          <Button
            asChild
            className="button hidden sm:flex"
          >
            <Link
              href="/#events"
            >
              Explore more events
            </Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}


      {/* EVENTS ORGANIZED */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Events Organized
          </h3>
          <Button
            asChild
            size="lg"
            className="button hidden sm:flex"
          >
            <Link
              href="/events/create"
            >
              Create new event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ProfilePage