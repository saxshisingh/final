const express = require('express');
const childWalletRoutes = require('./routes/childroutes'); 
const parentRoutes = require('./routes/parentroutes'); 

const  app  = require('./app'); 
const PORT = process.env.PORT || 3000;

app.use('/childwallet', childWalletRoutes);

app.use('/parentwallet', parentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
