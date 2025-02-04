import { useState, useEffect, useCallback } from "react";
import { generateText } from "../../api/openAIService"; // Import the Gemini service
import { useLocation } from "react-router-dom";

const LearnCharacter = () => {
    const location = useLocation();
    const { character } = location.state || {};
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateDescription = useCallback(async () => {
      setIsLoading(true);
      setDescription("");

      try {
          const prompt = `Create a Wikipedia-style breakdown of ${character?.name}. Do not write in a bulleted point fashion. 
          Write only in paragraphs. Make sure to have sections to the description including: a general breakdown,
          history, powers, and personality. Make sure you title these sections as well.`;
          const result = await generateText(prompt);
          setDescription(result);

          if (character && character.id) {
              localStorage.setItem(`characterDescription-${character.id}`, result);
          }

      } catch (error) {
          console.error("Error generating character description:", error);
          setDescription("Failed to generate description. Please try again later.");
      } finally {
          setIsLoading(false);
      }
  }, [character]); 

    useEffect(() => {
        if (character && character.id) {  // Check character and ID
            const storedDescription = localStorage.getItem(`characterDescription-${character.id}`);
            if (storedDescription) {
                setDescription(storedDescription);
            } else {
                handleGenerateDescription(); // Generate if not in local storage
            }
        }
    }, [character, character?.id, handleGenerateDescription]); //  Make sure to include character.id in the dependency array

    return (
        <div>
            <button onClick={handleGenerateDescription} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Character Description"}
            </button>

            {/* Conditionally render the description */}
            {description && (
                <div className="generated-description">
                    {description.split("\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            )}

            {/* Display a placeholder or message while loading or if there's no description yet */}
            {!description && isLoading && <p>Generating description...</p>}
            {!description && !isLoading && (
                <p>Click the button to generate a character description.</p>
            )}
        </div>
    );
};

export default LearnCharacter;