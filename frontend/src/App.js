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
    this.state = {
      start: false,
      value: '',
      text: '',
      open: false,
      done: '',
      counter: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addWord = this.addWord.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleStart = this.handleStart.bind(this)
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
    const arr = this.state.value.split('. ')
    arr.forEach((element) => {
      const para = document.createElement('p')
      const node = document.createTextNode(element)
      para.appendChild(node)
      div.appendChild(para)
    })
  }

  handleSubmit(event) {
    this.generateText()
    event.preventDefault()
  }

  handleStart(event) {
    action.startFile()
    this.setState({ start: true })
    event.preventDefault()
  }

  handleDownload(event) {
    action.downloadFile()
    event.preventDefault()
  }

  addWord(event) {
    var selection
    if (window.getSelection) selection = window.getSelection()
    else if (typeof document.selection != 'undefined')
      selection = document.selection
    let str = selection.toString()
    if (str.length > 0) {
      let elem = selection.getRangeAt(0)
      if (elem && !selection.isCollapsed) {
        if (
          selection.anchorNode.parentNode === selection.focusNode.parentNode
        ) {
          var span = document.createElement('span')
          span.className = 'highlight'
          elem.surroundContents(span)
        }
      }
      let res = action.postWord({
        word: str,
        element: elem['commonAncestorContainer']['textContent'],
      })
      if (res) {
        this.setState({
          open: true,
          done: str,
          counter: this.state.counter + 1,
        })
      }
    }
    event.preventDefault()
  }

  render() {
    return (
      <div className="item">
        <div
          className="item"
          style={{
            flexDirection: 'row',
            paddingTop: '10px',
            justifyContent: 'space-around',
          }}
        >
          <Button variant="contained" onClick={this.handleStart}>
            Запуск
          </Button>
          <Button
            variant="contained"
            onClick={this.handleDownload}
            disabled={!this.state.start}
          >
            Скачать
          </Button>
        </div>
        <div id="text-enter" style={{ width: '95%' }} className="item">
          <OutlinedInput
            id="outlined-basic"
            name="text"
            variant="outlined"
            multiline
            rows={5}
            className="item"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Введите текст"
          />
          <Button
            variant="contained"
            type="submit"
            onClick={this.handleSubmit}
            disabled={!this.state.start}
          >
            Начать перевод
          </Button>
        </div>
        <Box
          component="div"
          style={{ width: '95%' }}
          className="item"
          sx={{ border: '1px dashed grey' }}
        >
          <div id="text" className="item">
            <p></p>
          </div>
        </Box>
        <Fab
          style={this.style}
          onClick={this.addWord}
          disabled={!this.state.start}
        >
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
            {this.state.done + ' words: ' + this.state.counter.toString()}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default App
