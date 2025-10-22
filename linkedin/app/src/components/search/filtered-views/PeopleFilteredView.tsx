import { useApp } from "@/contexts/AppContext";
import { MdVerified } from "react-icons/md";
import NoResultsView from "./NoResultsView";
import Button from "@/components/ui/button";

export default function PeopleFilteredView() {
  const {
    searchResults: { allPeople: people },
    navigateToProfile,
  } = useApp();

  if (people.length === 0) {
    return <NoResultsView />;
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          {people.map((person, index) => (
            <div
              key={person.id}
              className={`flex items-start gap-3 py-4 ${
                index !== people.length - 1 ? "border-b border-gray-200" : ""
              }`}
              onClick={() => navigateToProfile(person.id)}
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="text-[14px] font-semibold text-gray-900 hover:underline cursor-pointer">
                    {person.name}
                  </h3>
                  {person.isVerified && (
                    <MdVerified className="text-[16px] text-gray-700 flex-shrink-0" />
                  )}
                  {person.connectionDegree && (
                    <span className="text-[14px] text-gray-600 ml-1">
                      • {person.connectionDegree}
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-gray-900 mt-1 line-clamp-2">
                  {person.title}
                </p>
                <p className="text-[14px] text-gray-600 mt-1">
                  {person.location}
                </p>
                {person.about && (
                  <p className="text-[14px] text-gray-600 mt-2 line-clamp-2">
                    {person.about.split(".")[0]}.
                  </p>
                )}
              </div>
              <Button variant="secondary">Follow</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
