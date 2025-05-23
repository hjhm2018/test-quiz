import { useEffect, useState } from "react";
import { questions } from "./assets/data/data";
import "./App.css";

function App() {
  let [current, setCurrent] = useState(0);
  let [score, setScore] = useState(0);
  let [clicked, setClicked] = useState(false);
  let [show, setShow] = useState(false);
  let [questionsArr, setQuestionsArr] = useState([]);
  let [correct, setCorrect] = useState(false);

  // My approach
  const startQuiz = () => {
    let sortedQuestions = questions.sort(() => Math.random() - 0.5);

    for (const question of sortedQuestions) {
      question.answers.sort(() => Math.random() - 0.5);
    }

    setQuestionsArr(sortedQuestions);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const nextQuestion = () => {
    setCurrent((current) => current + 1);
    setClicked((clicked) => !clicked);
    setShow((show) => !show);
  };

  const selectAnswer = (answer) => {
    setClicked((clicked) => !clicked);
    setShow((show) => !show);

    if (answer) {
      setScore((score) => score + 1);
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const resetTest = () => {
    setCurrent(0);
    setScore(0);
    startQuiz();
  };

  return (
    <>
      <div>
        {current === questionsArr.length ? (
          <div className="score">
            <h1 className="score-heading">Your Score is:</h1>
            <p>
              {score} out of {questionsArr.length} (
              {((score / questionsArr.length) * 100).toFixed(2)}%)
            </p>
            <button className="retakeBtn" onClick={resetTest}>
              Retake Test
            </button>
          </div>
        ) : (
          <>
            <h1>Choose the right answer after listening the audio</h1>
          </>
        )}

        {questionsArr &&
          questionsArr.length > 0 &&
          questionsArr.map((item, index) => {
            let { question, answers, feedback } = item;
            return index === current ? (
              <div className="flex" key={index}>
                <p>{question}</p>
                <div className="flex">
                  {answers.map((answer, index) => {
                    return (
                      <button
                        key={`button-${index}`}
                        onClick={() => selectAnswer(answer.correct)}
                        className={`${clicked ? "unclickable" : ""} ${
                          clicked && answer.correct ? "correct-answer" : ""
                        } ${clicked && !answer.correct ? "wrong-answer" : ""}`}
                        // disabled={clicked ? true : false}
                      >
                        {answer.text}
                      </button>
                    );
                  })}
                </div>
                {show ? (
                  <p>
                    {correct ? "✅" : "❌"}&nbsp;
                    <b>Answer</b>: <i>{feedback}</i>
                  </p>
                ) : (
                  ""
                )}

                {clicked && (
                  <button id="nextBtn" onClick={nextQuestion}>
                    Next
                  </button>
                )}
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </>
  );
}

export default App;
