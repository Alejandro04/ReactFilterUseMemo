import { ChangeEvent, useEffect, useMemo, useState } from "react";

interface Item {
  id: number;
  title: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((item) => {
        setItems(item);
        setIsLoading(false);
      });
  }, []);

  const itemsFiltered = useMemo(() => {
    return items.filter((item:Item) => item.title.toUpperCase().includes(filter.toUpperCase()));
  }, [items, filter])

  const listItems = itemsFiltered.map((item:Item) =>
    <li key={item.id}>{item.title}</li>
  );

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="App">
       <input type="text" value={filter} onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          setFilter(ev.target.value)
        }} />
      <div>
        {listItems}
      </div>
    </div>
  );
}