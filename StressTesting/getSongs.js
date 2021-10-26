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

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsbERIMjdoMC16SWQtZGh1UG9IRUlnTmVIQ3l6ZVNuZUFiYmdqa3lZTHhBIn0.eyJqdGkiOiJjY2VlMjY0ZC0xMGFjLTRhMGMtOGFjNi04OTI0MzgxZGRmMjMiLCJleHAiOjE2MzUzMjY1NjgsIm5iZiI6MCwiaWF0IjoxNjM1MjkwNTY4LCJpc3MiOiJodHRwOi8vMTY4LjYyLjM5LjIxMDo4MDgwL2F1dGgvcmVhbG1zL0thcmFva2UtUmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMGE3NDE5ZDItYmM1Mi00ZWQ2LTg0MjQtODU0ODE4ZTBlMGM4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoia2FyYW9rZS1jbGllbnQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI3YjU5Njg0NC00NDA4LTQ2MzQtOWM1ZC02ZGViMjc2ODdkNTgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xNjguNjIuMzkuMjEwOjgwODAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJwcmVtaXVtLXJvbGUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJrYXJhb2tlLWNsaWVudCI6eyJyb2xlcyI6WyJwcmVtaXVtIiwidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMzMifQ.QM0NXjpH-DWJDbshqrSipKzOA0ls2ycXpWnI__0YGoPw_od4EQ-gRc6rYom8miusU1FxkO0dPGwn7O3zLMGRcj2oA6HywMBTduslGUIG2pkvXUgaPxKwDJ-hTUACB5KjgaQQiDtbkYQSF3SG4r67T08fwyjGWdEQe2BDUYEzfdZNInC6N7g_Q1Ae6smrJqMW_rNxYN8LmIxAOhkPqyyMqqyr9u6ApiNC3sUDf6vjygLddjVBovpjUr6e3SXeKcwTzZ_teVT6YPgXPZk9dNqxiSkq1q9kVN6l6eKMH0tqDO1eScyNpwZA_8EIkk9a0KA-zWT5OGYwMVTRMlbyky1IyQ"
const params = {

  headers: {

    'Authentication': 'bearer ' + token,

  },

};

export default function () {
  const res = http.get('http://168.62.39.210:5000/songs', params);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);

}