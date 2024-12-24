<div align="center">
    <img style="vertical-align: middle;" width="128" height="128" src="./readme-assets/coin-rates-logo.png">
    <h1 align="center">
      <a href="https://github.com/simplr-sh/coin-rates">
        Coin Rates
      </a>
    </h1>
    <p align="center"><strong>Simple & Fast Cryptocurrency Rate API</strong></p>
</div>

<div align="center">
  <img style="vertical-align: middle;" src="./readme-assets/coin-rates-banner.png">
</div>

## Features

- 🚀 **95+ Top Cryptocurrencies** - All major tokens supported
- ⚡ **Real-time Rates** - Updates every 30 seconds
- 🌐 **Global Edge Network** - Powered by Cloudflare
- 🆓 **100% Free** - No API keys, no rate limits
- 📊 **JSON & CSV Support** - Flexible data formats
- ⚙️ **Simple Integration** - Just HTTP GET requests

## Quick Start

```bash
# Get all supported tokens
curl https://coin-rates.simplr.sh/api/tokens.json

# Get Bitcoin's current rate
curl https://coin-rates.simplr.sh/api/rates/bitcoin

# Get Ethereum's current rate
curl https://coin-rates.simplr.sh/api/rates/ethereum
```

## API Documentation

### Get All Available Tokens

Retrieve a list of all supported cryptocurrency tokens.

**JSON Format:**
```
GET https://coin-rates.simplr.sh/api/tokens.json
```

**CSV Format:**
```
GET https://coin-rates.simplr.sh/api/tokens.csv
```

Returns a list of tokens with their ID, name, and symbol. Example response (JSON):
```json
[
  {
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC"
  },
  {
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "ETH"
  }
  // ... more tokens
]
```

Use these token IDs to query individual token rates.

### Get Token Exchange Rate

Get the current USD exchange rate for a specific cryptocurrency token.

```
GET https://coin-rates.simplr.sh/api/rates/{id}
```

- `{id}`: The token ID from the tokens list (e.g., "bitcoin", "ethereum")
- Updates every 30 seconds
- Returns the current USD exchange rate

Example Request:
```
GET https://coin-rates.simplr.sh/api/rates/bitcoin
```

Example Response:
```json
{
  "btc": {
    "usd": 42789.65
  }
}
```

Error Response (Invalid Token ID):
```json
{
  "error": "Invalid token id"
}
```

#### Rate Limits
- No request limits
- No bandwidth limits
- 30-second cache per token
- Free for all usage

## Integration Examples

### JavaScript/Node.js
```javascript
// Fetch Bitcoin rate
const response = await fetch('https://coin-rates.simplr.sh/api/rates/bitcoin');
const data = await response.json();
console.log(`Bitcoin price: $${data.btc.usd}`);
```

### Python
```python
import requests

# Fetch Ethereum rate
response = requests.get('https://coin-rates.simplr.sh/api/rates/ethereum')
data = response.json()
print(f"Ethereum price: ${data['eth']['usd']}")
```

## Development

### Prerequisites
- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)
- Cloudflare account (for deployment)

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/simplr-sh/coin-rates.git
cd coin-rates
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8787`.

## Deployment

### Deploy to Cloudflare Workers

1. Login to Cloudflare (if not already):
```bash
wrangler login
```

2. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Your API will be deployed to `https://<your-worker>.workers.dev`.

### Environment Variables
No environment variables required for basic setup.

### Notes
- Updates automatically every 30 seconds
- Uses Cloudflare's edge network for global distribution
- Zero configuration required

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🌟 Star this repo if you find it useful
- 🐛 Report bugs by creating an issue
- 💡 Request features through issues