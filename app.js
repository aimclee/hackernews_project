const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url){
    
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

//hashchange는 #12345의 값에 변동이 생겼을 때 나타남.
window.addEventListener('hashchange', function() {
  const id = location.hash.substr(1); // 문자열 인덱스 1부터 끝까지의 값 가져오기
  const newsContent = getData(CONTENT_URL.replace('@id', id));
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

for(let i = 0; i < 10; i++) {
  const div = document.createElement('div');
  const li = document.createElement('li');
  const a = document.createElement('a');
  

  // 실제 html 문서의 구조와 코드의 구조가 유사하게 변경되었다. 이를 위해서 dom api를 제거함.
  div.innerHTML = `
  <li>
    <a href = "#${newsFeed[i].id}">
    ${newsFeed[i].title} (${newsFeed[i].comments_count}) 
    </a>
  </li>
  `;

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);


// console.log(newsFeed);

// ${} : 변수 내의 값을 표현하고자 할 때

/*
document.getElementById('root').innerHTML = 
`<ul>
    <li>${newsFeed[0].title}</li>
    <li>${newsFeed[1].title}</li>
    <li>${newsFeed[2].title}</li>
</ul>`
*/