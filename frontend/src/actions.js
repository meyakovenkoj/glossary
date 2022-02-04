import axios from 'axios'

const url = 'http://127.0.0.1:5000/'

// export function getRecipes(form_data) {
//   return (dispatch) => {
//     axios
//       .get(`${url}/api/recipe/`, {})
//       .then((res) => {
//         if (Array.isArray(res.data.Recipes)) {
//           let recipes = res.data.Recipes
//           console.log(recipes)
//           dispatch({ type: 'GET_RECIPES', recipes })
//         }
//       })
//       .catch((err) => {
//         alert(err.response.data.message)
//       })
//   }
// }

export function postWord(form_data) {
  return axios
    .post(`${url}api/add`, form_data, {
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
      `${url}start`,
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
    .get(`${url}stop`, {})
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
