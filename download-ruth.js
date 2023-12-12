(async () => {
  const ruthText = await fetch("/rut1.json").then((r) => r.json());
  // parse simple yml list
  console.log(ruthText);
  ruthText.forEach((verse) => {
    const row = document.createElement("div");
    row.className = "verse-row";
    const verseNumber = document.createElement("div");
    verseNumber.className = "verse-number";
    verseNumber.innerText = verse.verse;
    const verseText = document.createElement("div");
    verseText.className = "verse-text";
    verse.text.split("\n").forEach((line) => {
      const lineElement = document.createElement("p");
      lineElement.innerText = line;
      verseText.appendChild(lineElement);
    });
    row.appendChild(verseNumber);
    row.appendChild(verseText);
    document.getElementById("rut1").appendChild(row);
  });
})();
