import { useEffect, useState } from 'react';
import { assetUrl } from '../utils/format';

function ImageUpload({ existingImage = '', images = [], onChange }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = images.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPreviews(urls);
    return () => urls.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [images]);

  const addImages = (event) => {
    const selected = Array.from(event.target.files || []);
    onChange([...images, ...selected]);
    event.target.value = '';
  };

  const removeImage = (index) => {
    onChange(images.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="image-upload">
      <label className="image-upload__drop">
        <span>Upload property images</span>
        <small>Select one or more images. The first selected image is used as the public listing image.</small>
        <input accept="image/*" multiple onChange={addImages} type="file" />
      </label>

      <div className="image-upload__preview">
        {!previews.length && existingImage && (
          <figure>
            <img alt="Current property" src={assetUrl(existingImage)} />
            <figcaption>Current image</figcaption>
          </figure>
        )}
        {previews.map((preview, index) => (
          <figure key={`${preview.name}-${preview.url}`}>
            <img alt={preview.name} src={preview.url} />
            <button aria-label={`Remove ${preview.name}`} onClick={() => removeImage(index)} type="button">Remove</button>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
