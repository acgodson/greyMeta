import React, { useState, useEffect } from "react";
import FlashcardList from "../section/flashcardlist";
// import axios from "axios";

function FlashCards() {
  //   const [cards, setCards] = useState([]);

  //   //useEffect(() => {
  //   //     axios.get('url')
  //   //           .then(res => {
  //   //             setCards(

  //   //                 res.data.results.map((item, index) => {
  //   //               let decoded_incorrect = item.incorrect_answers.map(it => decodeString(it))
  //   //               return {
  //   //                 id: `${index}-${Date.now()}`,
  //   //                 question: decodeString(item.question),
  //   //                 answer: decodeString(item.correct_answer),
  //   //                 options: [...decoded_incorrect, decodeString(item.correct_answer)]
  //   //               }
  //   //             }))
  //   //           });
  //   //   }, [])

  function decodeString(str: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return <FlashcardList flashcards={SAMPLE_CARDS} />;
}

const SAMPLE_CARDS = [
  {
    id: 1,
    question: "What is 3 + 3 ?",
    answer: "4",
    options: ["2", "3", "5", "4"],
  },
  {
    id: 2,
    question: "What is four + four ?",
    answer: "8",
    options: ["2", "3", "8", "4"],
  },
  {
    id: 3,
    question: "What is six * six ?",
    answer: "36",
    options: ["2", "36", "5", "4"],
  },
];

export default FlashCards;
