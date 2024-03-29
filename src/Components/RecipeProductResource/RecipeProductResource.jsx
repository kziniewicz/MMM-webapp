import React, { useState } from "react";
import { useResourceQueries } from "../../js/resources.js";
import "./RecipeProductResource.css";

const RecipeProductResource = ({ type }) => {
  const {
    getResource: { data: resources },
    addResourceMutation,
    editResourceMutation,
    deleteResourceMutation,
  } = useResourceQueries(type);

  const [selectedResource, setSelectedResource] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newResourceName, setNewResourceName] = useState("");
  const [editingResource, setEditingResource] = useState(false);
  const [resourceIdToEdit, setResourceIdToEdit] = useState("");
  const [addingResource, setAddingResource] = useState(false);
  const [deletingResource, setDeletingResource] = useState(false);
  const [resourceIdToDelete, setResourceIdToDelete] = useState("");

  const handleResourceChange = (e) => {
    setSelectedResource(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddResource = async () => {
    try {
      await addResourceMutation.mutateAsync(newResourceName);
      setNewResourceName("");
      alert(`Pomyślnie dodano ${type}`);
    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania zasobu:", error);
    }
  };

  const handleEditResource = async () => {
    try {
      await editResourceMutation.mutateAsync({
        resourceId: resourceIdToEdit,
        newResourceName,
      });
      setNewResourceName("");
      setEditingResource(false);
      alert(`Pomyślnie edytowano ${type}`);
    } catch (error) {
      console.error("Wystąpił błąd podczas edycji zasobu:", error);
    }
  };

  const handleDeleteResource = async () => {
    try {
      await deleteResourceMutation.mutateAsync(resourceIdToDelete);
      setDeletingResource(false);
      alert(`Pomyślnie usunięto ${type}`);
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania zasobu:", error);
    }
  };

  if (type === "ingredients") {
    return (
      <div>
        <h1>{type.toUpperCase()}</h1>
        <div className="option-btn">
          <button onClick={() => setAddingResource(true)}>Dodaj {type}</button>
        </div>
        {addingResource && (
          <div className="option-resource">
            <input
              type="text"
              placeholder={`Nowa nazwa ${type}`}
              value={newResourceName}
              onChange={(e) => setNewResourceName(e.target.value)}
            />
            <button onClick={handleAddResource}>Dodaj {type}</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="opt-container">
      <h1>{type.toUpperCase()}</h1>

      {selectedResource && (
        <p>
          Wybrany {type}: {selectedResource}
        </p>
      )}
      {editingResource ? (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID zasobu"
            value={resourceIdToEdit}
            onChange={(e) => setResourceIdToEdit(e.target.value)}
          />
          <input
            type="text"
            placeholder={`Nowa nazwa ${type}`}
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
          />
          <button onClick={handleEditResource}>Edytuj {type}</button>
        </div>
      ) : (
        <div className="option-btn">
          <button
            onClick={() => {
              setResourceIdToEdit(selectedResource);
              setEditingResource(true);
            }}
          >
            Edytuj {type}
          </button>
        </div>
      )}

      <div className="option-btn">
        {" "}
        <button onClick={() => setAddingResource(true)}>Dodaj {type}</button>
      </div>
      {addingResource && (
        <div className="option-resource">
          <input
            type="text"
            placeholder={`Nowa nazwa ${type}`}
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
          />
          <button onClick={handleAddResource}>Dodaj {type}</button>
        </div>
      )}

      <div className="option-btn">
        <button onClick={() => setDeletingResource(true)}>Usuń {type}</button>
      </div>
      {deletingResource && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID zasobu"
            value={resourceIdToDelete}
            onChange={(e) => setResourceIdToDelete(e.target.value)}
          />
          <button onClick={handleDeleteResource}>Usuń {type}</button>
        </div>
      )}
    </div>
  );
};

export default RecipeProductResource;
