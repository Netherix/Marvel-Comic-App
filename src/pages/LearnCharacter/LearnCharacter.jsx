import { useState, useEffect, useCallback } from "react";
import { generateText } from "../../api/GeminiAPI/fetchText";
import { useLocation } from "react-router-dom";
import "./LearnCharacter.css";

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
            history, powers, and personality. Make sure you title these sections as well. Also make sure to stay true to 
            the Marvel comic books in regards to detailing the character and not the MCU movies. Please don't use any special characters 
            like * or # within the description. Please also refrain from using the character name itself as an individual title.
            Keep each section to one paragraph in length. Do not use bullet points at any point. Stick to paragraph form only.`;

            const result = await generateText(prompt);

            const cleanedDescription = result.replace(/[*#:]/g, "");

            setDescription(cleanedDescription);

            if (character && character.id) {
                localStorage.setItem(`characterDescription-${character.id}`, cleanedDescription);
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
            const storedDescription = localStorage.getItem(`characterDescription-${character.id}`);
            if (storedDescription) {
                setDescription(storedDescription);
            } else {
                handleGenerateDescription();
            }
        }
    }, [character, character?.id, handleGenerateDescription]);

    return (
        <div>
            <button onClick={handleGenerateDescription} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Character Description"}
            </button>

            {description && (
                <div className="generated-description">
                    {description.split("\n").map((paragraph, index) => {
                        const trimmedParagraph = paragraph.trim().toLowerCase();

                        if (
                            trimmedParagraph === "general breakdown" ||
                            trimmedParagraph === "history" ||
                            trimmedParagraph === "powers" ||
                            trimmedParagraph === "personality"
                        ) {
                            return (
                                <p key={index} className="section-title">
                                    {paragraph}
                                </p>
                            );
                        } else if (paragraph.trim() !== "") {
                            return <p key={index} className="description-text">{paragraph}</p>;
                        } else {
                            return null; // Exclude empty paragraphs
                        }
                    })}
                </div>
            )}

            {!description && isLoading && <p>Generating description...</p>}
            {!description && !isLoading && (
                <p>Click the button to generate a character description.</p>
            )}
        </div>
    );
};

export default LearnCharacter;