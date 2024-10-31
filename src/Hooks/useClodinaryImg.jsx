import axios from 'axios';

const useClodinaryImg = () => {
    // const [imageUrl, setImageUrl] = useState()
    // console.log(imageUrl);

    const handleImage = async(imageFile)=> {
        const formDataCLD = new FormData();
            formDataCLD.append('file', imageFile);
            formDataCLD.append('upload_preset', import.meta.env.VITE_CLD_UPLOAD_PRESET);

            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLD_NAME}/image/upload`, formDataCLD);
            console.log(data);

            const imageUrl = data.secure_url;
            // setImageUrl(imageUrl)
            return imageUrl
    }
    return [handleImage]
};

export default useClodinaryImg;