const axios = require('axios');

it('endpoint /api/comentarios returns data', async () => {
  const response = await axios.get('http://localhost:3000/api/comentarios');
  expect(response.status).toBe(200);
  expect(response.data).toBeDefined();
});
