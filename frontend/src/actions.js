import axios from 'axios'

const url = 'http://' + document.location.hostname

export function postWord(form_data) {
  return axios
    .post(`${url}/api/add`, form_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return true
    })
    .catch((err) => {
      alert(err)
      return false
    })
}

export function startFile() {
  return axios
    .post(
      `${url}/api/start`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      return true
    })
    .catch((err) => {
      alert(err)
      return false
    })
}

export function downloadFile() {
  return axios
    .get(`${url}/api/stop`, {})
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'glossary.csv') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
    .catch((err) => {
      alert(err)
      return false
    })
}
