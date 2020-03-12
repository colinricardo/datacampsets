import adjectiveList from "../resources/wordFiles/adjectives";
import nounList from "../resources/wordFiles/nouns";
import verbList from "../resources/wordFiles/verbs";

const NUM_NOUNS = 1435;
const NUM_VERBS = 1042;
const NUM_ADJECTIVES = 912;

const getWord = (type: string) => {
  let randomIndex: number;

  switch (type) {
    case "noun":
      randomIndex = Math.floor(Math.random() * NUM_NOUNS);
      return nounList[randomIndex];
    case "verb":
      randomIndex = Math.floor(Math.random() * NUM_VERBS);
      return verbList[randomIndex];
    case "adjective":
      randomIndex = Math.floor(Math.random() * NUM_ADJECTIVES);
      return adjectiveList[randomIndex];
    default:
      return null;
  }
};

const getCapitalizedAlphaNumericString = (length: number) => {
  return Math.random()
    .toString(36)
    .substr(2, length)
    .toUpperCase();
};

const generateLoginCode = () => {
  return `${getWord("adjective")}-${getWord("verb")}-${getWord("noun")}`;
};

export default { generateLoginCode };
