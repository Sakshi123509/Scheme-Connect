import app from './app.js';
import errorHandler from './middleware/errormiddleware.js';
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//need for running server.js directly with node command
export default app;