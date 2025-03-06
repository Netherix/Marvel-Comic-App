import { useState, useEffect, useCallback } from "react";
import { generateText } from "../../api/GeminiAPI/fetchText";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import "./LearnCharacter.css";

const LearnCharacter = () => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { character } = location.state || {};

  const handleGenerateDescription = useCallback(async () => {
    setIsLoading(true);
    setDescription("");

    try {
      const prompt = `Create a Wikipedia-style breakdown of ${character?.name}. Do not write in a bulleted point fashion. 
        Write only in paragraphs. Make sure to have sections to the description including: a general breakdown, 
        history, powers, and personality. Make sure you title these sections as well. Also make sure to stay true to 
        the Marvel comic books in regards to detailing the character and not the MCU movies. Please don't use any special characters 
        like * or # within the description. Please also refrain from using the character name itself as an individual title.
        Keep each section to one paragraph in length. Do not use bullet points at any point. Stick to paragraph form only.`;

      const result = await generateText(prompt);
      const cleanedDescription = result.replace(/[*#:]/g, "");
      setDescription(cleanedDescription);

      if (character && character.id) {
        localStorage.setItem(
          `characterDescription-${character.id}`,
          cleanedDescription
        );
      }
    } catch (error) {
      console.error("Error generating character description:", error);
      setDescription("Failed to generate description. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [character]);

  useEffect(() => {
    if (character && character.id) {
      const storedDescription = localStorage.getItem(
        `characterDescription-${character.id}`
      );
      if (storedDescription) {
        setDescription(storedDescription);
      } else {
        handleGenerateDescription();
      }
    }
  }, [character, character?.id, handleGenerateDescription]);

  return (
    <>
      <Nav />

      <div className="character-title-container">
          <p>Delve deep into the lore of {character?.name}!</p>
        <div className="title-image-container">
          <img
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
            alt={character?.name}
          />
          <div className="title-buttons-container">
            <Button 
              text="Add To Favorites"           
            />
            <Button 
              text="Explore Comics" 
              onClick={() => navigate(`/comics/${character.id}`, { state: { character } })}
            />
          </div>
        </div>
      </div>

      {description && (
        <div className="generated-description">
          {description.split("\n").map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim().toLowerCase();

            if (
              trimmedParagraph === "general breakdown" ||
              trimmedParagraph === "general description" ||
              trimmedParagraph === "history" ||
              trimmedParagraph === "powers" ||
              trimmedParagraph === "powers and abilities" ||
              trimmedParagraph === "personality"
            ) {
              return (
                <p key={index} className="section-title">
                  {paragraph}
                </p>
              );
            } else if (trimmedParagraph !== "") {
              return (
                <p key={index} className="description-text">
                  {paragraph}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}

      <div className="generate-description-button">
        <Button
          text={isLoading ? "Loading New Description..." : "Generate New Description"}
          onClick={handleGenerateDescription}
          disabled={isLoading}
        />
      </div>

      {!description && !isLoading && (
        <p>Click the button to generate a character description.</p>
      )}

      <Footer />
    </>
  );
};

export default LearnCharacter;
