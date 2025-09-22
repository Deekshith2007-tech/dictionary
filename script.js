    const wordInput = document.getElementById('word-input');
    const searchBtn = document.getElementById('search-btn');
    const resultDisplay = document.getElementById('result-display');

    searchBtn.addEventListener('click', async () => {
        const word = wordInput.value.trim();
        if (!word) {
            resultDisplay.innerHTML = '<p class="error">Please enter a word.</p>';
            return;
        }

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            if (response.ok && data.length > 0) {
                const wordData = data[0];
                let html = `<h3>${wordData.word}</h3>`;
                if (wordData.phonetics && wordData.phonetics.length > 0) {
                    const audio = wordData.phonetics.find(p => p.audio);
                    if (audio) {
                        html += `<p><audio controls src="${audio.audio}"></audio></p>`;
                    }
                }
                wordData.meanings.forEach(meaning => {
                    html += `<p><strong>${meaning.partOfSpeech}:</strong></p>`;
                    meaning.definitions.forEach(def => {
                        html += `<p>${def.definition}</p>`;
                        if (def.example) {
                            html += `<p><em>Example: ${def.example}</em></p>`;
                        }
                    });
                });
                resultDisplay.innerHTML = html;
            } else {
                resultDisplay.innerHTML = '<p class="error">Word not found. Please try another word.</p>';
            }
        } catch (error) {
            resultDisplay.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
            console.error('Error fetching data:', error);
        }
    });