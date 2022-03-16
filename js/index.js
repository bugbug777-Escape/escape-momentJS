const base = 'https://hex-escape-room.herokuapp.com';
let newsData;

function validate_data() {
  const api = `${base}/api/news/v1/data`;
  const data = newsData;
  axios.post(api, { data }).then((res) => {
    console.log(res);
  });
}

function datetime_tranform() {
  const formator = 'YYYY-MM-DD HH:mm:ss';

  newsData.forEach((item, index) => {
    const timezone = item.iana;
    let timestamp;

    if (typeof item.publishedAt !== 'string') {
      newsData[index].publishedAt = moment(item.publishedAt)
        .tz(timezone)
        .format(formator);
    } else {
      timestamp = new Date(item.publishedAt);
      newsData[index].publishedAt = moment(timestamp)
        .tz(timezone)
        .format(formator);
    }
  });
}

function get_data() {
  const api = `${base}/api/news/v1/data`;
  axios.get(api).then((res) => {
    if (res.data.status) {
      newsData = res.data.articles;
      datetime_tranform();
      validate_data();
    }
  });
}

function init() {
  get_data();
}

init();
