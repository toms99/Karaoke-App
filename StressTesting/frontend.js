import http from 'k6/http';

import { check, sleep } from 'k6';

export const options = {
  stages: [

    { duration: '10s', target: 1000 }, 
    { duration: '10s', target: 1500 },
    { duration: '10s', target: 2000 }, 
    { duration: '10s', target: 2500 }, 
    { duration: '10s', target: 0 }, // scale down. Recovery stage.

  ],};

export default function () {

  const res = http.get('http://168.62.39.210:3000/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);

}