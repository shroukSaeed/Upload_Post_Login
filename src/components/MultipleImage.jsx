import React, { useState } from 'react';
import axios from 'axios';

function MultipleImage() {
    const [imageFiles, setImageFiles] = useState([]);
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');


    const tokken = localStorage.getItem('token')

    const [token, setToken] = useState(tokken);

    const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        setImageFiles([...e.target.files]);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleUpload = async () => {
        try {
            const apiUrl = 'https://wearher-from-mimi.com/api/post-create-image';


            const formData = new FormData();
            formData.append('post_type', 'image');
            formData.append('post_category', 'scientific');
            formData.append('text', text);

            // Append each selected image to the formData
            imageFiles.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            };

            const response = await axios.post(apiUrl, formData, { headers });

            // Handle the API response here
            console.log('Images uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div>

            <input type="text" name='text' value={text} placeholder='type your description...' className='form-control my-5' onChange={handleTextChange} />

            <input className='form-control' type="file" multiple accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} className='btn btn-warning text-light my-5'>Upload Images</button>


        </div>
    );
}

export default MultipleImage;
