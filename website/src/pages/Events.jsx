import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function Events() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600">SOFEA Events</h1>
      <p className="text-gray-700 mb-10">
        Explore our upcoming and past events organized by the Software Engineering Society of UTMKL (MJIIT).
      </p>

      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard
            title="Orientation Coding Session"
            date="January 2026"
            description="Introduction to programming tools for new students."
          />
          <EventCard
            title="Python Workshop"
            date="December 2025"
            description="Hands-on Python programming workshop."
          />
        </div>
      </section>
    </div>
  );
}
