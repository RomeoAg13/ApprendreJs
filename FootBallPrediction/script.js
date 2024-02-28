async function ButtonClick() {
    const date = document.getElementById('dateChoosen').value;
    const url = `https://football-prediction-api.p.rapidapi.com/api/v2/predictions?federation=UEFA&iso_date=${date}&market=classic`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b5e71e373cmsh88f7c6d5994b015p10e03ejsn85ac285ecd37',
            'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        const predictionData = document.getElementById('predictionData');

        if (result.data && result.data.length > 0) {
            const matchesInfo = result.data.map(match => {
                return `
                    <div>
                    <hr>
                        <p>Home Team: ${match.home_team}</p>
                        <p>Away Team: ${match.away_team}</p>
                        <p>Competition Name: ${match.competition_name}</p>
                        <p>Prediction: ${match.prediction}</p>
                        <p>Score: ${match.result}</p>
                        <p>Start Date: ${match.start_date}</p>
                    </div>
                `;
            }).join('');
            predictionData.innerHTML = `<h1>Match Details   1 = HOME TEAM, 2 = AWAY TEAM, 12 = DRAW </h1> ${matchesInfo}`;
        } else {
            predictionData.innerHTML = "<p>Aucun match trouvé pour cette date.</p>";
        }
    } catch (error) {
        console.error(error);
    }
}
