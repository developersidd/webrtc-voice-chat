import { Podcast, Search } from "lucide-react";
import RoomCard from "../components/RoomCard";
import Button from "../components/ui/Button";

const rooms = [
  {
    id: 1,
    topic: "Which framework best for frontend ?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 2,
    topic: "What’s new in machine learning?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "Why people use stack overflow?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  return (
    <section className="border-t border-secondary">
      <div className="container mx-auto pt-8 pb-16 px-4 sm:px-2">
        {/*  Header */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <div className="-top-2 relative">
              <h3 className="text-white text-lg">All voice rooms</h3>
              <div className="w-3/5 mt-1 h-[3px] bg-blue" />
            </div>
            <div
              className="
            bg-secondary rounded-full px-4 py-2 flex items-center gap-3 mt-4 w-[300px]
          "
            >
              <Search className="size-5 text-grey" />
              <input
                className="text-grey w-full outline-0"
                type="text"
                placeholder="Search for rooms"
              />
            </div>
          </div>
          <Button
            label="Create new room"
            className="mt-4 bg-green-500 hover:bg-green-600 flex-row-reverse gap-1.5"
            icon={<Podcast />}
          />
        </div>
        {/*  Room List */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
