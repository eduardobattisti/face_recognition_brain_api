import Clarifai from 'clarifai';

const APP = new Clarifai.App({
    apiKey: 'e57cbf35fb4642a68b0a3069d35b1243'
  });
  
const handleApiCall =(req, res) => {
    APP.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))

}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries!'))

    /*
    if(!found) {
        res.status(400).json('not found');
    };
    */
};

export { handleImage, handleApiCall};