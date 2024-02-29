async function ButtonClick() {
    const date = document.getElementById('dateChoosen').value;
    const url = `https://football-prediction-api.p.rapidapi.com/api/v2/predictions?federation=UEFA&iso_date=${date}&market=classic`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2a55080ac9mshf2eb7725d0cefa4p12078ejsn732b06c29bc5',
		'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        const predictionData = document.getElementById('predictionData');

        if (result.data && result.data.length > 0) {
            const matchesInfo = result.data.map(match => {
                var predictedData;
                if ( match.prediction === "1"){
                    predictedData = match.home_team;
                }else if (match.prediction === "2"){ 
                    predictedData = match.away_team;
                }else if ( match.prediction === "12"){
                    predictedData = `${match.away_team} + ${match.home_team}`;

                }else if (match.prediction === "1X"){
                    predictedData = `${match.away_team} or DRAW`;
                }

                return `
                    <div class='container'>
                        <span class='team'>
                            <p>${match.home_team} VS ${match.away_team}</p>
                            <p id='predict'>Prediction: ${predictedData}</p>
                        </span>
        
                        <span class='nameCompet'>
                            <p>Score: ${match.result}</p>
                            <p>Competition Name: ${match.competition_name}</p>
                        </span>
        
                        <span class='others'>
                            <p>Start Date: ${match.start_date}</p>
                        </span>
                    </div>
                `;
            }).join('');
        
            predictionData.innerHTML = `<h1>Match Details</h1> ${matchesInfo}`;
        } else {
            predictionData.innerHTML = "<p>Aucun match trouvé pour cette date.</p>";
        }
    } catch (error) {
        console.error(error);
    }
}
