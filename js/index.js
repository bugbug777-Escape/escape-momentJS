const base = 'https://hex-escape-room.herokuapp.com';
let newsData;

function get_data() {
  const api = `${base}/api/news/v1/data`;
  axios.get(api).then((res) => {
    if (res.data.status) {
      newsData = res.data;
    }
    console.log(newsData);
  });
}

function init() {
  get_data();
}

init();
