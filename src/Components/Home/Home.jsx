import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipesQuery } from "../../js/recipes";
import { useProductsQuery } from "../../js/products";
import { useArticles } from "../../js/articles";
import questionMarkImage from "../../images/question-mark.png";
import articleImage from "../../images/article.jpg";
import "./Home.css";

const Home = () => {
  const [currentPage] = useState(1);
  const [searchTerm] = useState("");
  const [sortDirection] = useState("DESC");
  const {
    data: recipesData,
    isLoading: recipesLoading,
    isError: recipesError,
  } = useRecipesQuery(1096, searchTerm, sortDirection);
  const { data: productData } = useProductsQuery(
    132,
    searchTerm,
    sortDirection
  );
  const { data: articlesData, isLoading, isError } = useArticles(currentPage); 

  return (
    <div className="home-content">
      <div className="banner" id="banner">
        <div className="content">
          <div className="overlay">
            <h2>Meal MasterMind</h2>
            <p>
              Odkryj nowe poziomy kulinarnych inspiracji i personalizacji teraz,
              gdy jesteś z nami. Jako zalogowany użytkownik, masz pełny dostęp
              do naszych spersonalizowanych funkcji i narzędzi, które pomogą Ci
              w tworzeniu zdrowych i smacznych posiłków dopasowanych do Twoich
              preferencji.
            </p>
          </div>
        </div>
      </div>

      <div className="row" id="row">
        <div className="title">
          <p className="titleText">
            Popularne <span>P</span>rzepisy
          </p>
        </div>
        <div className="content">
          {recipesLoading ? (
            <p>Ładowanie...</p>
          ) : recipesError ? (
            <p>Wystąpił błąd podczas pobierania danych przepisów.</p>
          ) : (
            recipesData &&
            recipesData.content &&
            recipesData.content.slice(0, 3).map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img src={recipe.coverImageUrl} />
                <p>{recipe.name}</p>
              </div>
            ))
          )}
        </div>
        <div className="more-button">
          <Link to="/recipes">
            <button>Zobacz więcej</button>
          </Link>
        </div>{" "}
      </div>

      <div className="row" id="row">
        <div className="title">
          <p className="titleText">
            Popularne <span>P</span>rodukty
          </p>
        </div>
        <div className="content">
          {productData &&
            productData.content &&
            productData.content.slice(0, 3).map((product) => (
              <div className="recipe-card" key={product.id}>
                {product.image && product.image.url ? (
                  <img src={product.image.url} alt="Product" />
                ) : (
                  <img src={questionMarkImage} alt="Question Mark" />
                )}
                <p>{product.name}</p>
              </div>
            ))}
        </div>
        <div className="more-button">
          <Link to="/products">
            <button>Zobacz więcej</button>
          </Link>
        </div>
      </div>

      <div className="row" id="row">
        <div className="title">
          <p className="titleText">
            Popularne <span>A</span>rtykuły
          </p>
        </div>
        <div className="content">
          {articlesData &&
            articlesData.content &&
            articlesData.content.slice(0, 3).map((article) => (
              <div className="recipe-card" key={article.id}>
                <img src={articleImage} alt="Product" />

                <p>{article.title}</p>
              </div>
            ))}
        </div>
        <div className="more-button">
          <Link to="/articles">
            <button>Zobacz więcej</button>
          </Link>
        </div>
      </div>

      <div className="contact" id="contact">
        <div className="title">
          <p className="titleText">
            <span>K</span>ontakt
          </p>
        </div>
        <div className="form-container">
          <div className="contactForm">
            <h3>Wyślij Wiadomość</h3>
            <div className="inputBox">
              <input type="text" placeholder="Imię" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Nazwisko" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Email" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Treść" />
            </div>
            <button>Wyślij</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
