import express from 'express';
// const {spawn} = require('child_process');
import cp from 'child_process';

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  let dataToSend;

  // spawn을 통해 새로운 child process를 생성!, 첫 번째 인자는 실행할 명령어이며 두 번째는 python 프로그램으로 실행할 스크립트의 이름
  const python = cp.spawn('python3', ['app.py']);
  python.stdout.on('data', (data)=>{
    dataToSend = data.toString();
  })
  // 아래 코드와 같이 스크래핑한 데이터를 확인할 수 있도록 stdout의 출력은 문자열로 변환하여 변수에 저장
  python.on('close', (code)=>{
    res.send(dataToSend);
  })
});

app.listen(port, () => console.log(`Listening on ${port}`));
