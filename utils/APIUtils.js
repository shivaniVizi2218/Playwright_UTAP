
const apiUrls=require('../data/apiUrls.json')
async function makeGetRequest(request) {
    const url =apiUrls.getRequestApiUrl;
    const headers = {
        Accept: 'application/json',
    };
    const response = await request.get(url, { headers });
    return response;
}
async function makePostRequest(request, data) {
    const url = apiUrls.postRequestApiUrl;
    const headers = {
        Accept: 'application/json',
    };
    const response = await request.post(url, { headers, data });
    return response;
}

async function makePutRequest(request, data) {
    const url = apiUrls.putRequestApiUrl;
    const headers = {
        Accept: 'application/json',
    };
    const response = await request.put(url, { headers, data });
    return response;
}

async function makeDeleteRequest(request) {
    const url = apiUrls.deleteRequestApiUrl;
    const response = await request.delete(url);
    return response;
}

 
export { makeGetRequest, makePostRequest, makePutRequest, makeDeleteRequest };