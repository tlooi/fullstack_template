import { values } from './src/test';
import { hello } from '@shared/test';
import express from 'express';



const app = express();
app.listen(4000, () => {
    console.log('Server started')
    console.log(hello);
    console.log(values);
    console.log("AWFJIOAWUHAWUOI")
});