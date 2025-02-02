# PINJOC

PINJOC is a decentralized finance (DeFi) application.

## Tech Stack
- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework for styling
- **ShadCN UI** - Modern UI components
- **RainbowKit** - Ethereum wallet connection

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (latest LTS version recommended)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/PINJOC.git
   cd PINJOC
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your **Project ID** from [Reown Cloud](https://cloud.reown.com/):
   - Sign up/log in to [Reown Cloud](https://cloud.reown.com/)
   - Create a new project and get your **Project ID**
   - Add the **Project ID** to your environment variables:
     ```sh
     echo "VITE_CONNECT_WALLET_PROJECT_ID=YOUR_PROJECT_ID" > .env
     ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment
For production deployment, use:
```sh
npm run build
```
Then serve the `dist/` directory using your preferred hosting provider.

## License
MIT License

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.

## Contact
For inquiries, contact [your email or social handle].

