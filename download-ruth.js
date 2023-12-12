const parseForLiterals = (text) => {
  const words = text.split(" ");
  const literals = [];
  for (let i = 0; i < words.length; i++) {
    const token = words[i];
    if (token.startsWith("[[")) {
      const idx = words.slice(i).findIndex((w) => w.includes("]]"));
      const word = words.slice(i, i + idx + 1).join(" ");
      literals.push(word);
      i += idx;
      continue;
    }
    literals.push(token);
  }
  return literals;
};

const scriptureToHTML = (scripture, node) => {
  scripture.forEach((verse) => {
    const row = document.createElement("div");
    row.className = "verse-row";
    const verseNumber = document.createElement("div");
    verseNumber.className = "verse-number";
    verseNumber.innerText = verse.verse;
    const verseText = document.createElement("div");
    verseText.className = "verse-text";
    verse.text.split("\n").forEach((line) => {
      const lineElement = document.createElement("p");

      parseForLiterals(line).forEach((word) => {
        const wordElement = document.createElement("span");
        if (word.startsWith("[[")) {
          wordElement.className = "literal";
          const label = word.replace(/\[\[(.*?)\|(.*?)]]/, "$1");
          const literal = word.replace(/\[\[(.*?)\|(.*?)]]/, "$2");
          wordElement.innerText = label;
          wordElement.dataset.literal = literal;
        } else {
          wordElement.innerText = word;
        }
        lineElement.appendChild(wordElement);
      });

      verseText.appendChild(lineElement);
    });
    row.appendChild(verseNumber);
    row.appendChild(verseText);
    node.appendChild(row);
  });
};

(async () => {
  const ruthText = await fetch("/rut1.json").then((r) => r.json());
  scriptureToHTML(ruthText, document.getElementById("rut1"));
})();
