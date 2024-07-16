import { useState, useEffect } from "react";
import Header from "./pages/Header";
import PropertyList from "./pages/PropertyList";
import MapViewTab from "./pages/MapViewTab";
import axios from "axios";

const URL = "http://localhost:3002/opn";
function App() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const response = await axios.get(URL);

    setProperties(response.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const editPropertyById = async (id, formData) => {
    const response = await axios.put(URL + "/" + id, formData);

    const updatedProperties = properties.map((property) => {
      console.log(property);
      if (property.id === id) {
        return { ...property, ...response.data };
      }

      return property;
    });

    setProperties(updatedProperties);
  };

  return (
    <div className="app">
      <Header />
      <PropertyList properties={properties} onEdit={editPropertyById} />
      <MapViewTab />
    </div>
  );
}

export default App;
