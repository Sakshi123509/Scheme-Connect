import app from './app.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//need for running server.js directly with node command
export default app;