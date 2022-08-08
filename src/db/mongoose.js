const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Database is connected successfully!');
});