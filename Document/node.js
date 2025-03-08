const express = require('express');
const fetch = require('node-fetch'); // for making API requests from Node.js
const app = express();
app.use(express.json());

app.post('/api/user/register', async (req, res) => {
  try {
    const assetXResponse = await fetch('ASSET_X_USER_API_ENDPOINT/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //add any needed authorization headers.
      },
      body: JSON.stringify(req.body),
    });
    const assetXData = await assetXResponse.json();
    res.json(assetXData);
  } catch (error) {
    res.status(500).json({ message: 'Error communicating with Asset-x API' });
  }
});
