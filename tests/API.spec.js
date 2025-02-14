require('dotenv').config();
const { test, expect } = require('@playwright/test');
const data = require('../data/apiData.json');  

test.describe('API automation with Reqres and external data', () => {

  const baseUrl = data.baseUrl;  // Get base URL from apiDdata.json

  // GET Request
  test('GET list of users', async ({ request }) => {
    const response = await request.get(`${baseUrl}${data.endpoints.users}${data.queryParams.page}`);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log('GET response:', responseBody);
    
    expect(responseBody.page).toBe(2);
  });

  // POST Request
  test('POST create a user', async ({ request }) => {
    const response = await request.post(`${baseUrl}${data.endpoints.users}`, {
      data: {
        name: data.user.name,
        job: data.user.job
      }
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log('POST response:', responseBody);
    
    expect(responseBody.name).toBe(data.user.name);
    expect(responseBody.job).toBe(data.user.job);
  });

  // PUT Request
  test('PUT update a user', async ({ request }) => {
    const response = await request.put(`${baseUrl}${data.endpoints.userById}`, {
      data: {
        name: data.user.name,
        job: data.user.updatedJob
      }
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log('PUT response:', responseBody);
    
    expect(responseBody.name).toBe(data.user.name);
    expect(responseBody.job).toBe(data.user.updatedJob);
  });

  // PATCH Request
  test('PATCH update user job', async ({ request }) => {
    const response = await request.patch(`${baseUrl}${data.endpoints.userById}`, {
      data: {
        job: data.user.patchedJob
      }
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log('PATCH response:', responseBody);
    
    expect(responseBody.job).toBe(data.user.patchedJob);
  });

  // DELETE Request
  test('DELETE remove a user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}${data.endpoints.userById}`);
    expect(response.status()).toBe(204);  // 204 No Content indicates successful deletion
    console.log('DELETE response status:', response.status());
  });

});
