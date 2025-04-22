let model;
const threshold = 0.9; 

toxicity.load(threshold).then(m => {
  model = m;
  console.log("Modelo cargado");
});

function analyzeText() {
  const text = document.getElementById("inputText").value;
  const resultBox = document.getElementById("resultBox");

  if (!model || !text) {
    resultBox.innerHTML = "Cargando modelo o texto vacío...";
    return;
  }

  model.classify([text]).then(predictions => {
    let output = `<strong>Texto:</strong> "${text}"<br><br>`;
    predictions.forEach(pred => {
      const isToxic = pred.results[0].match;
      const prob = (pred.results[0].probabilities[1] * 100).toFixed(2);
      output += `<div><strong>${pred.label}</strong>: ${isToxic ? "Tóxico" : "No tóxico"} (${prob}%)</div>`;
    });

    resultBox.innerHTML = output;
  });
}
