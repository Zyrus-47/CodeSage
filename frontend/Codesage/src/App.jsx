import { useEffect, useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import './App.css'


function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)

const [review, setReview] = useState(``)


  async function reviewCode() {
    const response = await axios.post(
      'http://localhost:3000/ai/get-review',
      { code }
    )
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">{
          review}</div>
      </main>
    </>
  )
}

export default App
