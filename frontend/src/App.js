import * as React from 'react'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import * as action from './actions'
import './App.css'
import { Fab } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', text: '', open: false, done: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addWord = this.addWord.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.generateText = this.generateText.bind(this)
  }

  style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  generateText() {
    const div = document.getElementById('text')
    const arr = this.state.text.split('. ')
    arr.forEach((element) => {
      const para = document.createElement('p')
      const node = document.createTextNode(element)
      para.appendChild(node)
      div.appendChild(para)
    })
  }

  handleSubmit(event) {
    this.setState({ text: this.state.value }, this.generateText())
    event.preventDefault()
  }

  handleStart(event) {
    action.startFile()
    event.preventDefault()
  }

  handleDownload(event) {
    action.downloadFile()
    event.preventDefault()
  }

  addWord(event) {
    let str = window.getSelection().toString()
    if (str.length > 0) {
      let elem = window.getSelection().getRangeAt(0)
      let res = action.postWord({
        word: str,
        element: elem['commonAncestorContainer']['wholeText'],
      })
      if (res) {
        this.setState({ open: true, done: str })
      }
    }
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleStart}>
          Start
        </Button>
        <Button variant="contained" onClick={this.handleDownload}>
          Download
        </Button>
        <form onSubmit={this.handleSubmit}>
          <div id="text-enter">
            <OutlinedInput
              id="outlined-basic"
              name="text"
              variant="outlined"
              multiline
              rows={5}
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Введите текст"
            />

            <Button variant="contained" type="submit">
              Готово
            </Button>
          </div>
        </form>
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          <div id="text"></div>
        </Box>
        <Fab style={this.style} onClick={this.addWord}>
          <AddIcon />
        </Fab>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            variant="outlined"
            severity="success"
            sx={{ width: '100%' }}
          >
            {this.state.done}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default App
