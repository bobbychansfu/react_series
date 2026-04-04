import { useState, useEffect, useRef } from "react";
import type { Person } from "@models/PersonType";

function useFetchRandomUser(trigger: number) {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const nextIdRef = useRef(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;

    async function fetchRandomUser() {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const seed = data.info.seed;
        const name = data.results[0].name.first;
        const profilePic = data.results[0].picture.large;
        const age = data.results[0].dob.age;

        setPeopleList((prev) => [
          ...prev,
          {
            id: nextIdRef.current++,
            name,
            profilePic,
            seed,
            age,
            fav: false,
          },
        ]);
      } catch (error) {
        console.log(`${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchRandomUser();
  }, [trigger]);
  return { peopleList, loading, setPeopleList };
}

export default useFetchRandomUser;
