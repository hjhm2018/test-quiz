import { useState } from 'react'
import { questions } from './assets/data/data'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import './App.css'

function App() {
  let [current, setCurrent] = useState(0)
  let [score, setScore] = useState(0)
  let [clicked, setClicked] = useState(false)
  let [show, setShow] = useState(false)

  const nextQuestion = () => {
    setCurrent((current) => current + 1)
    setClicked(!clicked)
    setShow(!show)
  }

  const selectAnswer = (answer, option) => {
    setClicked(!clicked)
    setShow(!show)

    if (answer === option) {
      setScore((score) => score + 1)
    }
  }

  const resetTest = () => {
    setCurrent(0)
    setScore(0)
  }

  return (
    <>
      {/* <img src={require('./assets/img/cat.jpg')} alt="cat" /> */}
      <div>
        {current === questions.length ? (
          <div className="score">
            <h1 className="score-heading">Your Score is:</h1>
            <p>
              {score} out of {questions.length} (
              {(score / questions.length) * 100}%)
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

        {questions &&
          questions.length > current &&
          questions.map((item, index) => {
            let { question, options, answer } = item

            let audioQuestion = require(`./assets/audio/${question}.mp3`)

            return index === current ? (
              <div key={index}>
                <audio src={`${audioQuestion}`} controls></audio>
                <div className="flex">
                  {options.map((option, index) => {
                    let image = require(`./assets/img/${option}.jpg`)
                    return (
                      <button
                        key={`button-${index}`}
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                        onClick={() => selectAnswer(answer, option)}
                        className={`${clicked ? 'unclickable' : ''}`}
                      >
                        {answer === option ? (
                          <BsCheckCircleFill
                            className={`green ${show ? '' : 'hide'}`}
                          />
                        ) : (
                          <BsXCircleFill
                            className={`red ${show ? '' : 'hide'}`}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
                {clicked && (
                  <button className="nextBtn" onClick={nextQuestion}>
                    Next
                  </button>
                )}
              </div>
            ) : (
              ''
            )
          })}
      </div>
    </>
  )
}

export default App
