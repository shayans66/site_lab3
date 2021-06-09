
const API_KEY = 'sFKjswV4VpMyJ02yt8IReAISD5uK09rU'
const URL_PREFIX = 'https://api.giphy.com/v1/gifs/search'

const limit = 9
const rating = 'g'

const button = document.getElementById('gifsubmit')
const form = document.getElementById('formsubmit')
const input = document.getElementById('search')

const gifs = document.getElementById('gifresults')

const loadbutton = document.getElementById('loadmore')

const formloadmore = document.getElementById('formloadmore')

let offset = 0


async function showGifs(event, shouldClear){

  event.preventDefault()

  let search = input.value 

  // const res = await fetch(`
  //   ${URL_PREFIX} + '?api_key='+${API_KEY}+'&q='+${search}
  //   + '&rating=' + ${rating} + 
  //   + '&limit=' + ${limit}
  //   `
  // )

  if(shouldClear){
    gifs.innerHTML = ''
    offset = 0
  }

  const res = await fetch(
    URL_PREFIX + '?api_key=' + API_KEY +
    '&q=' + search + '&rating=' + rating
    + '&limit=' + limit
    + '&offset=' + offset
  )
  const data = await res.json()

  data.data.forEach(element => {
    
    let img = document.createElement('img')
    img.src = element.images.fixed_height.url
    img.alt = element.title


    gifs.appendChild(img)
  });

  offset += limit

  console.log(data);
  // console.log(data['data'][0]['images'].preview.mp4);

}




window.onload = () => {
  

  form.addEventListener('submit', (event) => {
    showGifs(event, true)
  })

  // loadbutton.addEventListener('click', (event) => {
  //   event.preventDefault()
  //   showGifs(event, false)
  // })
  formloadmore.addEventListener('submit', (event) => {
    event.preventDefault()
    showGifs(event, false)
  })

}