const parseForLiterals = (text) => text.split(/\s*(?:\[\[|]])\s*/);

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

      parseForLiterals(line)
        .reduce((acc, item) => {
          if (item.includes("|")) {
            acc.push(item);
          } else {
            acc.push(...item.split(/\s+/));
          }
          return acc;
        }, [])
        .forEach((word) => {
          console.log(word);
          const wordElement = document.createElement("span");
          if (word.includes("|")) {
            wordElement.className = "literal";
            const [label, literal] = word.split("|");
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
