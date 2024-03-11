import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDeleteRecipeMutation } from "../../js/recipes"; 
import "../RecipeProductResource/RecipeProductResource.css";

const AdminPanelRecipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState("");

  const navigate = useNavigate();

  const deleteRecipeMutation = useDeleteRecipeMutation(); 

  const handleAddRecipeClick = () => {
    navigate("/add-recipe");
  };

  const handleDeleteRecipeClick = async () => {
    if (window.confirm("Czy na pewno chcesz usunąć ten przepis?")) {
      try {
        await deleteRecipeMutation.mutateAsync(deleteId);
        setCurrentPage(1);
        console.log("Przepis został pomyślnie usunięty");
      } catch (error) {
        console.error("Błąd podczas usuwania przepisu:", error);
      }
    }
  };

  const toggleDeleteInputs = () => {
    setShowDeleteInputs(!showDeleteInputs);
  };

  return (
    <div>
      <h1>PRZEPISY</h1>
      <div className="option-btn">
        <button onClick={handleAddRecipeClick}>Dodaj przepis</button>
      </div>
      <div className="option-btn">
        <button onClick={toggleDeleteInputs}>Usun przepis</button>
      </div>
      {showDeleteInputs && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID przepisu"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button onClick={handleDeleteRecipeClick}>Usuń</button>
        </div>
      )}
      <div className="option-btn">
        <button onClick={() => setShowEditInput(true)}>Edytuj przepis</button>
      </div>

      {showEditInput && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID przepisu"
            value={editRecipeId}
            onChange={(e) => setEditRecipeId(e.target.value)}
          />
          <button onClick={() => navigate(`/add-recipe/${editRecipeId}`)}>
            Edytuj
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanelRecipes;
