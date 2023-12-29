import createServer from './server';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3333;
const app = createServer();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})