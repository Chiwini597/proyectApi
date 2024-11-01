// Función auxiliar para obtener información adicional desde una URL
async function fetchFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch additional data");
        const data = await response.json();
        return data.name || "";  // Obtener el nombre u otro valor relevante
    } catch (error) {
        console.error("Error fetching additional data:", error);
        return "";
    }
}

// Esta función obtiene la información de un personaje por ID
async function getCharacter(id) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) throw new Error("Character not found");
        const data = await response.json();

        // Cargar información adicional
        const films = await Promise.all(data.films.map(fetchFromUrl));
        const starships = await Promise.all(data.starships.map(fetchFromUrl));
        const species = await Promise.all(data.species.map(fetchFromUrl));

        // Devolver la data con los nombres resueltos
        return {
            ...data,
            films,
            starships,
            species,
        };
    } catch (error) {
        console.error("Error fetching character:", error);
        return null;
    }
}

// Esta función obtiene un personaje aleatorio (ID entre 1 y 83)
async function getRandomCharacter() {
    const randomId = Math.floor(Math.random() * 83) + 1;
    return getCharacter(randomId);
}

// Exportar funciones para su uso en otros archivos
export { getCharacter, getRandomCharacter };

